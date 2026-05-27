"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { investmentStages, founderObjectives } from "@/lib/constants";
import React, { useState, useEffect } from "react";
import { FounderProfile, FullUserProfile, Startup, FounderObjective, CapTableEntry, IncorporationDetails } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, ArrowRight, Plus, Trash, HelpCircle, Check, Sparkles } from "lucide-react";
import LogoUploader from "./logo-uploader";
import { useAuth, useFirestore, useStorage, FirestorePermissionError, errorEmitter } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { Checkbox } from "@/components/ui/checkbox";
import { createSession } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FounderRegisterFormClient() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Wizard steps: 1 = Core Details, 2 = Incorporation, 3 = Optional Financials & Cap Table
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  // Step 1 Form States
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState<string>("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState<FounderObjective[]>([]);

  // Step 2 Form States
  const [isIncorporated, setIsIncorporated] = useState(false);
  const [incCountry, setIncCountry] = useState("");
  const [incType, setIncType] = useState<IncorporationDetails['incorporationType'] | "">("");
  const [incDate, setIncDate] = useState("");
  const [entityNumber, setEntityNumber] = useState("");
  const [taxId, setTaxId] = useState("");

  // Step 3 Form States (Financials & Cap Table)
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [mrr, setMrr] = useState("");
  const [burnRate, setBurnRate] = useState("");
  const [runway, setRunway] = useState("");
  
  const [shareholders, setShareholders] = useState<Omit<CapTableEntry, 'id'>[]>([]);
  const [newShareholderName, setNewShareholderName] = useState("");
  const [newShareholderInvestment, setNewShareholderInvestment] = useState("");
  const [newShareholderEquity, setNewShareholderEquity] = useState("");
  const [newShareholderStage, setNewShareholderStage] = useState<string>("Pre-seed");

  const auth = useAuth();
  const firestore = useFirestore();
  const storage = useStorage();

  // Debug & Diagnostics States
  const [debugLogs, setDebugLogs] = useState<{ time: string; msg: string; type: "info" | "success" | "warn" | "error" }[]>([]);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [pingResults, setPingResults] = useState<{ auth: string; firestore: string }>({ auth: "pending", firestore: "pending" });

  const logDebug = (msg: string, type: "info" | "success" | "warn" | "error" = "info") => {
    const time = new Date().toLocaleTimeString();
    setDebugLogs(prev => {
      const updated = [...prev, { time, msg, type }];
      if (typeof window !== "undefined") {
        (window as any).__OKIDEX_REGISTRATION_DEBUG__ = updated;
      }
      return updated;
    });
    console.log(`[FOUNDER-REGISTER-DEBUG] [${type.toUpperCase()}] ${msg}`);
  };

  const runPings = async () => {
    logDebug("Running endpoint pre-flight network diagnostics...", "info");
    
    // Auth Ping
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000);
      await fetch("https://securetoken.googleapis.com/v1/token", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal
      });
      clearTimeout(id);
      setPingResults(prev => ({ ...prev, auth: "success" }));
      logDebug("Firebase Auth server is reachable.", "success");
    } catch (e: any) {
      setPingResults(prev => ({ ...prev, auth: "blocked" }));
      logDebug(`Firebase Auth server check failed: ${e.message}. Possible network/CORS/DNS block or offline state.`, "error");
    }

    // Firestore Ping
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000);
      await fetch("https://firestore.googleapis.com/v1/projects", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal
      });
      clearTimeout(id);
      setPingResults(prev => ({ ...prev, firestore: "success" }));
      logDebug("Firestore Database server is reachable.", "success");
    } catch (e: any) {
      setPingResults(prev => ({ ...prev, firestore: "blocked" }));
      logDebug(`Firestore database server check failed: ${e.message}. Possible network/CORS/DNS block or offline state.`, "error");
    }
  };

  useEffect(() => {
    logDebug("Founder registration client component mounted.", "info");

    const handleError = (event: ErrorEvent) => {
      logDebug(`Captured unhandled window error: ${event.message} at ${event.filename}:${event.lineno}`, "error");
      setShowDiagnostics(true);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logDebug(`Captured unhandled promise rejection: ${event.reason?.message || event.reason}`, "error");
      setShowDiagnostics(true);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("error", handleError);
      window.addEventListener("unhandledrejection", handleRejection);
    }

    // Verify sessionStorage
    const sessionDetails = sessionStorage.getItem('registrationDetails');
    if (!sessionDetails) {
      logDebug("registrationDetails is missing in sessionStorage. Redirecting user to /register.", "warn");
    } else {
      try {
        const parsed = JSON.parse(sessionDetails);
        logDebug(`registrationDetails found in sessionStorage for: ${parsed.email || "unknown"} (role: ${parsed.role || "unknown"})`, "success");
      } catch (e: any) {
        logDebug(`Failed to parse registrationDetails: ${e.message}`, "error");
      }
    }

    // Verify Firebase SDK Initialization
    if (auth) {
      logDebug("Firebase Auth SDK is successfully initialized on client.", "success");
    } else {
      logDebug("Firebase Auth SDK failed to initialize or is null.", "error");
    }
    if (firestore) {
      logDebug("Firebase Firestore SDK is successfully initialized on client.", "success");
    } else {
      logDebug("Firebase Firestore SDK failed to initialize or is null.", "error");
    }

    // Preflight run
    runPings();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("error", handleError);
        window.removeEventListener("unhandledrejection", handleRejection);
      }
    };
  }, [auth, firestore]);

  // Enforce incorporation if stage is not "Idea"
  useEffect(() => {
    if (stage && stage !== "Idea") {
      setIsIncorporated(true);
      logDebug(`Stage is "${stage}". Automatically enforcing incorporation step.`, "info");
    }
  }, [stage]);

  const handleNextStep1 = (e: React.MouseEvent) => {
    logDebug("Navigating from Step 1 to Step 2...", "info");
    // Basic validation for Step 1
    if (!companyName || !tagline || !industry || !stage || !website || !description) {
      logDebug("Step 1 validation failed. Missing required fields.", "warn");
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }
    logDebug("Step 1 validation passed.", "success");
    setStep(2);
  };

  const handleNextStep2 = (e: React.MouseEvent) => {
    logDebug("Navigating from Step 2...", "info");
    if (isIncorporated) {
      if (!incCountry || !incType || !incDate || !entityNumber) {
        logDebug("Step 2 validation failed. Missing incorporation details.", "warn");
        toast({
          title: "Missing Legal Information",
          description: "Incorporated startups must provide country, legal structure, date, and registration number.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (isIncorporated) {
      logDebug("Startup is incorporated. Progressing to Step 3 (Financials).", "info");
      setStep(3);
    } else {
      logDebug("Startup is not incorporated. Bypassing Step 3 and proceeding with registration...", "info");
      handleRegister(false);
    }
  };

  const handleAddShareholder = () => {
    logDebug(`Adding shareholder: ${newShareholderName}`, "info");
    if (!newShareholderName || !newShareholderInvestment || !newShareholderEquity) {
      logDebug("Incomplete shareholder input details.", "warn");
      toast({
        title: "Incomplete Shareholder Details",
        description: "Please fill in Name, Investment, and Equity %.",
        variant: "destructive"
      });
      return;
    }

    setShareholders(prev => [
      ...prev,
      {
        shareholderName: newShareholderName,
        investment: parseFloat(newShareholderInvestment) || 0,
        shares: Math.round((parseFloat(newShareholderInvestment) || 0) / 10), // Mock share counting
        equityPercentage: parseFloat(newShareholderEquity) || 0,
        investmentStage: newShareholderStage as any
      }
    ]);
    logDebug(`Shareholder ${newShareholderName} added to Cap Table list state.`, "success");

    setNewShareholderName("");
    setNewShareholderInvestment("");
    setNewShareholderEquity("");
    setNewShareholderStage("Pre-seed");
  };

  const handleRemoveShareholder = (index: number) => {
    logDebug("Removing shareholder from index: " + index, "info");
    setShareholders(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleRegister = async (includeFinancials: boolean) => {
    logDebug(`handleRegister triggered. includeFinancials=${includeFinancials}`, "info");
    if (!auth || !firestore) {
      logDebug("Firebase auth or firestore is not initialized!", "error");
      toast({ title: "System Initializing...", variant: "destructive" });
      setShowDiagnostics(true);
      return;
    }

    setIsSubmitting(true);
    
    logDebug("1. Retrieving session registration details...", "info");
    const registrationDetailsString = sessionStorage.getItem('registrationDetails');
    if (!registrationDetailsString) {
      logDebug("Session expired or registrationDetails missing in sessionStorage", "error");
      toast({ title: "Registration Error", description: "Session expired.", variant: "destructive" });
      router.push('/register');
      setIsSubmitting(false);
      setShowDiagnostics(true);
      return;
    }
    
    const registrationDetails = JSON.parse(registrationDetailsString);
    logDebug(`Session details loaded successfully for: ${registrationDetails.email}`, "success");
    
    try {
        logDebug("2. Calling Firebase createUserWithEmailAndPassword...", "info");
        const userCredential = await createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password);
        const { user } = userCredential;
        logDebug(`Firebase user created successfully. UID: ${user.uid}`, "success");
        
        // 1. Create Startup Document
        logDebug("3. Building Startup document structure...", "info");
        const startupRef = doc(collection(firestore, 'startups'));
        const startupId = startupRef.id;

        // Upload logo if one was selected
        let uploadedLogoUrl = `https://picsum.photos/seed/${companyName.toLowerCase().replace(/\s/g, '-')}/200/200`; // Fallback stock
        if (logoFile && storage) {
            logDebug("Uploading company logo to Firebase Storage...", "info");
            try {
                const logoStorageRef = ref(storage, `logos/${user.uid}/${Date.now()}.webp`);
                const snapshot = await uploadBytes(logoStorageRef, logoFile);
                uploadedLogoUrl = await getDownloadURL(snapshot.ref);
                logDebug(`Company logo uploaded successfully: ${uploadedLogoUrl}`, "success");
            } catch (uploadError: any) {
                logDebug(`Company logo upload failed: ${uploadError.message}. Using stock fallback.`, "warn");
            }
        }

        // Build capTable entries with unique ids
        const finalCapTable: CapTableEntry[] = shareholders.map((sh, idx) => ({
            id: `sh-${Date.now()}-${idx}`,
            ...sh
        }));

        // Calculate total funds raised from capTable
        const totalFundsRaised = finalCapTable.reduce((acc, entry) => acc + entry.investment, 0);

        const incDetails: any = {
            isIncorporated
        };
        if (isIncorporated) {
            if (incCountry) incDetails.country = incCountry;
            if (incType) incDetails.incorporationType = incType;
            if (incDate) incDetails.incorporationDate = new Date(incDate).toISOString();
            if (entityNumber) incDetails.entityNumber = entityNumber;
            if (taxId) incDetails.taxId = taxId;
        }

        const newStartup: Startup = {
            id: startupId,
            companyName: companyName,
            companyLogoUrl: uploadedLogoUrl,
            founderIds: [user.uid],
            industry: industry,
            stage: stage as Startup['stage'],
            tagline: tagline,
            description: description,
            website: website,
            financials: {
                companyName,
                revenue: includeFinancials ? (parseFloat(revenue) || 0) : 0,
                expenses: includeFinancials ? (parseFloat(expenses) || 0) : 0,
                netIncome: includeFinancials ? ((parseFloat(revenue) || 0) - (parseFloat(expenses) || 0)) : 0,
                grossProfitMargin: 0,
                ebitda: 0,
                customerAcquisitionCost: 0,
                customerLifetimeValue: 0,
                monthlyRecurringRevenue: includeFinancials ? (parseFloat(mrr) || 0) : 0,
                cashBurnRate: includeFinancials ? (parseFloat(burnRate) || 0) : 0,
                runway: includeFinancials ? (parseFloat(runway) || 0) : 0,
            },
            monthlyFinancials: [],
            capTable: finalCapTable,
            incorporationDetails: incDetails,
            fundsRaised: totalFundsRaised
        };
        
        logDebug(`Writing Startup document to Firestore under ID: ${startupId}`, "info");
        await setDoc(startupRef, newStartup);
        logDebug("Startup document written successfully.", "success");

        const isLookingForCoFounder = objectives.includes('seekingCoFounders');

        // 2. Create User Document
        logDebug("4. Building User profile document...", "info");
        const profile: FounderProfile = {
          companyId: startupId,
          isLead: true,
          isPremium: false,
          title: 'Founder',
          objectives: objectives,
          isLookingForCoFounder: isLookingForCoFounder,
        };

        const fullUser: FullUserProfile = {
            id: user.uid,
            email: user.email!,
            name: registrationDetails.name,
            role: 'founder',
            avatarUrl: 'https://picsum.photos/seed/new-founder-avatar/400/400',
            profile,
            isLookingForCoFounder: isLookingForCoFounder,
        };
        
        const userDocRef = doc(firestore, 'users', user.uid);
        logDebug(`Writing User document to Firestore under UID: ${user.uid}`, "info");
        await setDoc(userDocRef, fullUser).catch(serverError => {
            logDebug("Firestore User document write failed with server permission error!", "error");
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: fullUser,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw permissionError;
        });
        logDebug("User document written successfully.", "success");

        // 3. Set session cookie
        logDebug("5. Creating server session...", "info");
        const idToken = await user.getIdToken();
        const sessionResult = await createSession(idToken);

        if (!sessionResult.success) {
          logDebug(`Server session creation failed: ${sessionResult.error}`, "error");
          throw new Error(sessionResult.error || "Failed to create server session.");
        }
        logDebug("Server session created successfully.", "success");

        // 4. Clean up and redirect
        logDebug("6. Registration complete. Redirecting to dashboard...", "success");
        sessionStorage.removeItem('registrationDetails');
        window.location.assign("/dashboard");

    } catch(error: any) {
        logDebug(`Registration process failed: ${error.message}`, "error");
        console.error("[FOUNDER-REGISTER-ERROR] Registration process failed at some step:", error);
        console.error("[FOUNDER-REGISTER-ERROR] Error Details:", {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        toast({
            title: "Registration Failed",
            description: error.message || "An error occurred during registration. Please check browser console or diagnostic panel for details.",
            variant: "destructive",
        });
        setIsSubmitting(false);
        setShowDiagnostics(true);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Visual Stepper Header */}
      <div className="relative flex justify-between items-center max-w-xl mx-auto px-4 py-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 -translate-y-1/2 z-0 transition-all duration-300" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
        
        {[
          { label: "Core Profile", id: 1 },
          { label: "Incorporation", id: 2 },
          { label: "Financials (Optional)", id: 3 }
        ].map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
              step === s.id ? "bg-violet-600 text-white border-violet-600 scale-110 shadow-lg shadow-violet-500/20" : 
              step > s.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-card text-muted-foreground border-muted"
            )}>
              {step > s.id ? <Check className="w-4 h-4" /> : s.id}
            </div>
            <span className={cn("text-[10px] font-semibold tracking-wide uppercase hidden sm:block", step === s.id ? "text-violet-600 dark:text-violet-400 font-bold" : "text-muted-foreground")}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: CORE PROFILE DETAILS */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <span className="text-sm font-medium mb-2 block text-center font-semibold text-foreground">Company Logo</span>
              <LogoUploader onFileChange={setLogoFile} />
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="companyName" 
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g., InnovateAI" 
                  autoComplete="organization"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Company Tagline <span className="text-destructive">*</span></Label>
                <Input 
                  id="tagline" 
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g., AI for everyone" 
                  autoComplete="off"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry <span className="text-destructive">*</span></Label>
                  <Input 
                    id="industry" 
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    placeholder="e.g., B2B SaaS" 
                    autoComplete="off"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage <span className="text-destructive">*</span></Label>
                  <Select value={stage} onValueChange={setStage}>
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentStages.map(stg => (
                        <SelectItem key={stg} value={stg}>{stg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website <span className="text-destructive">*</span></Label>
                <Input 
                  id="website" 
                  type="url"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://..." 
                  autoComplete="url"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Company Description <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="What does your company do?" 
                  autoComplete="off"
                  required 
                />
              </div>
              <div className="space-y-2 pt-4">
                <Label>What are your initial objectives?</Label>
                <div className="grid grid-cols-2 gap-4">
                  {founderObjectives.map(objective => (
                    <div key={objective.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`objective-${objective.id}`}
                        checked={objectives.includes(objective.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setObjectives(prev => [...prev, objective.id]);
                          } else {
                            setObjectives(prev => prev.filter(o => o !== objective.id));
                          }
                        }}
                      />
                      <Label htmlFor={`objective-${objective.id}`} className="font-normal cursor-pointer">{objective.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleNextStep1} className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-1">
              Next Step <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: INCORPORATION DETAILS */}
      {step === 2 && (
        <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in-50 duration-200">
          <div className="bg-card p-6 rounded-lg border border-border space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <h3 className="font-bold text-lg">Incorporation Status</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Let investors know if you have incorporated a legal business entity.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Switch 
                  id="inc-toggle"
                  checked={isIncorporated}
                  onCheckedChange={setIsIncorporated}
                  disabled={stage !== 'Idea'} // Forced to true if stage is pre-seed or beyond
                />
                <Label htmlFor="inc-toggle" className="font-bold uppercase tracking-wider text-xs">
                  {isIncorporated ? "Incorporated" : "Not Incorporated"}
                </Label>
              </div>
            </div>

            {stage !== 'Idea' && (
              <div className="bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs p-3.5 rounded-lg flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0 animate-pulse text-violet-500" />
                <div>
                  <span className="font-bold">Incorporation Mandatory:</span> Startups at the <strong>{stage}</strong> stage are expected to have a registered entity. Incorporation is required to continue.
                </div>
              </div>
            )}

            {isIncorporated && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incCountry">Where was the entity incorporated? <span className="text-destructive">*</span></Label>
                    <Input 
                      id="incCountry" 
                      value={incCountry}
                      onChange={e => setIncCountry(e.target.value)}
                      placeholder="e.g., Delaware (US), Singapore, UK" 
                      autoComplete="country-name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incType">Entity Structure <span className="text-destructive">*</span></Label>
                    <Select value={incType} onValueChange={(value: any) => setIncType(value)}>
                      <SelectTrigger id="incType">
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C-Corp">C-Corp</SelectItem>
                        <SelectItem value="S-Corp">S-Corp</SelectItem>
                        <SelectItem value="LLC">LLC</SelectItem>
                        <SelectItem value="Private Limited">Private Limited</SelectItem>
                        <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                        <SelectItem value="Charity">Charity</SelectItem>
                        <SelectItem value="CIO">CIO (Charitable Incorporated Organisation)</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incDate">Date of Incorporation <span className="text-destructive">*</span></Label>
                    <Input 
                      id="incDate" 
                      type="date"
                      value={incDate}
                      onChange={e => setIncDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entityNumber">Unique Registration Number (UEN / BRN) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="entityNumber" 
                      value={entityNumber}
                      onChange={e => setEntityNumber(e.target.value)}
                      placeholder="e.g., UEN, BRN, Co. Number" 
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Business Tax ID / EIN (Optional)</Label>
                  <Input 
                    id="taxId" 
                    value={taxId}
                    onChange={e => setTaxId(e.target.value)}
                    placeholder="e.g., US EIN, Tax Registry ID" 
                    autoComplete="off"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button onClick={() => setStep(1)} variant="outline" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            
            <Button onClick={handleNextStep2} disabled={isSubmitting} className="bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Registering...
                </>
              ) : isIncorporated ? (
                <>
                  Next: Financials <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: OPTIONAL FINANCIALS & CAP TABLE */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          <div className="bg-card p-6 rounded-lg border border-border space-y-6">
            <div className="border-b border-border pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" /> Complete Startup Financials & Cap Table (Optional)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                These forms are completely optional and skippable. You can click <strong>Skip & Complete</strong> at any time to breeze through registration and fill them in later in your profile edit dashboard.
              </p>
            </div>

            {/* Financial Fields */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-violet-600 dark:text-violet-400">1. Key Financial Data</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="revenue">Annual Revenue (USD)</Label>
                  <Input id="revenue" type="number" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="0" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="expenses">Annual Expenses (USD)</Label>
                  <Input id="expenses" type="number" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="0" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mrr">Monthly MRR (USD)</Label>
                  <Input id="mrr" type="number" value={mrr} onChange={e => setMrr(e.target.value)} placeholder="0" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="burnRate">Cash Burn Rate (Monthly)</Label>
                  <Input id="burnRate" type="number" value={burnRate} onChange={e => setBurnRate(e.target.value)} placeholder="0" autoComplete="off" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="runway">Runway (In Months)</Label>
                  <Input id="runway" type="number" value={runway} onChange={e => setRunway(e.target.value)} placeholder="0" autoComplete="off" />
                </div>
              </div>
            </div>

            {/* Cap Table Builder */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h4 className="font-semibold text-sm text-violet-600 dark:text-violet-400 flex items-center gap-1">
                2. Cap Table Shareholders
              </h4>
              
              {/* Dynamic list */}
              {shareholders.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden divide-y divide-border bg-secondary/20">
                  {shareholders.map((sh, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 text-xs">
                      <div>
                        <span className="font-bold">{sh.shareholderName}</span>
                        <span className="text-muted-foreground ml-2">({sh.investmentStage} stage)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          Investment: <strong>${sh.investment.toLocaleString()}</strong>
                        </div>
                        <div>
                          Equity: <strong>{sh.equityPercentage}%</strong>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveShareholder(idx)} className="h-7 w-7 text-destructive hover:text-destructive">
                          <Trash className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input forms */}
              <div className="bg-secondary/40 p-4 rounded-lg border border-border space-y-3">
                <h5 className="font-semibold text-xs tracking-wider uppercase text-muted-foreground">Add Shareholder</h5>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px]" htmlFor="sh-name">Shareholder Name</Label>
                    <Input id="sh-name" value={newShareholderName} onChange={e => setNewShareholderName(e.target.value)} placeholder="e.g. Founder, Investor Co." autoComplete="off" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]" htmlFor="sh-inv">Investment (USD)</Label>
                    <Input id="sh-inv" type="number" value={newShareholderInvestment} onChange={e => setNewShareholderInvestment(e.target.value)} placeholder="0" autoComplete="off" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]" htmlFor="sh-equity">Equity Percentage (%)</Label>
                    <Input id="sh-equity" type="number" value={newShareholderEquity} onChange={e => setNewShareholderEquity(e.target.value)} placeholder="0" autoComplete="off" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px]" htmlFor="sh-stage">Investment Stage</Label>
                    <Select value={newShareholderStage} onValueChange={setNewShareholderStage}>
                      <SelectTrigger id="sh-stage" className="h-9 text-xs">
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentStages.map(stg => (
                          <SelectItem key={stg} value={stg}>{stg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <Button type="button" onClick={handleAddShareholder} size="sm" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs h-8 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Shareholder
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button onClick={() => setStep(2)} variant="outline" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            
            <div className="flex gap-3">
              <Button onClick={() => handleRegister(false)} disabled={isSubmitting} variant="secondary" className="font-semibold text-muted-foreground border hover:text-foreground">
                Skip & Complete
              </Button>
              <Button onClick={() => handleRegister(true)} disabled={isSubmitting} className="bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Registering...
                  </>
                ) : (
                  "Save & Complete Registration"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Troubleshooting & Diagnostic Panel */}
      <div className="mt-12 pt-6 border-t border-border/80">
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Having trouble with registration?</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setShowDiagnostics(!showDiagnostics);
              if (!showDiagnostics) {
                runPings();
              }
            }}
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 hover:bg-violet-500/10 flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showDiagnostics ? "Hide Diagnostics" : "Troubleshoot & Diagnostics"}
          </Button>
        </div>

        {showDiagnostics && (
          <div className="mt-4 p-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.02] dark:bg-violet-500/[0.04] space-y-4 animate-in slide-in-from-bottom-4 duration-300">
            <h4 className="font-bold text-sm text-violet-600 dark:text-violet-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              Okidex Developer Diagnostic Panel
            </h4>
            
            {/* System Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border bg-card/50 flex flex-col justify-between">
                <span className="text-muted-foreground font-medium">Firebase Auth Ping</span>
                <span className={cn(
                  "font-bold uppercase mt-1",
                  pingResults.auth === "success" ? "text-emerald-500" :
                  pingResults.auth === "blocked" ? "text-destructive" : "text-amber-500 animate-pulse"
                )}>
                  {pingResults.auth === "success" ? "Accessible (OK)" :
                   pingResults.auth === "blocked" ? "Blocked / DNS Error" : "Checking..."}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-card/50 flex flex-col justify-between">
                <span className="text-muted-foreground font-medium">Firestore Ping</span>
                <span className={cn(
                  "font-bold uppercase mt-1",
                  pingResults.firestore === "success" ? "text-emerald-500" :
                  pingResults.firestore === "blocked" ? "text-destructive" : "text-amber-500 animate-pulse"
                )}>
                  {pingResults.firestore === "success" ? "Accessible (OK)" :
                   pingResults.firestore === "blocked" ? "Blocked / DNS Error" : "Checking..."}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-card/50 flex flex-col justify-between">
                <span className="text-muted-foreground font-medium">Session Storage</span>
                <span className={cn(
                  "font-bold uppercase mt-1",
                  sessionStorage.getItem('registrationDetails') ? "text-emerald-500" : "text-destructive"
                )}>
                  {sessionStorage.getItem('registrationDetails') ? "Loaded" : "Empty / Expired"}
                </span>
              </div>
            </div>

            {/* Diagnostic Logs Terminal */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-muted-foreground">Event & Connection Console Logs</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted" onClick={runPings} title="Re-run Diagnostics">
                    <Loader2 className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted" onClick={() => setDebugLogs([])} title="Clear Logs">
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="h-48 overflow-y-auto font-mono text-[10px] p-3 rounded-lg bg-black/90 text-zinc-300 border border-zinc-800 space-y-1 divide-y divide-zinc-800/40">
                {debugLogs.length === 0 ? (
                  <div className="text-muted-foreground italic text-center pt-16">No events captured yet. Try navigating or filling the form.</div>
                ) : (
                  debugLogs.map((log, idx) => (
                    <div key={idx} className="pt-1 flex gap-2">
                      <span className="text-zinc-600 shrink-0">{log.time}</span>
                      <span className={cn(
                        "font-semibold shrink-0 uppercase text-[9px]",
                        log.type === "success" ? "text-emerald-500" :
                        log.type === "error" ? "text-rose-500 font-bold" :
                        log.type === "warn" ? "text-amber-500" : "text-violet-400"
                      )}>
                        [{log.type}]
                      </span>
                      <span className="break-all whitespace-pre-wrap">{log.msg}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span>All diagnostics logs are also accessible via <code>window.__OKIDEX_REGISTRATION_DEBUG__</code></span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-[10px]"
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(debugLogs, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `okidex-registration-diagnostics-${Date.now()}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
              >
                Export Diagnostics Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
