
// A simple utility to convert Firestore Timestamps to strings, etc.
export function toSerializable<T>(data: any): T {
    if (data === null || data === undefined) {
      return data;
    }
    
    if (typeof data !== 'object') {
      return data;
    }
  
    // Handle Firestore Timestamps
    if (data.toDate && typeof data.toDate === 'function') {
      return data.toDate().toISOString() as any;
    }
  
    if (Array.isArray(data)) {
      return data.map(toSerializable) as any;
    }
  
    const res: { [key: string]: any } = {};
    for (const key in data) {
      res[key] = toSerializable(data[key]);
    }
  
    return res as T;
  }
    
