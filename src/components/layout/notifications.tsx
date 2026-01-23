"use client";

import { useState, useEffect, useTransition } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, UserCheck, Users } from "lucide-react";
import { Notification, NotificationType, FullUserProfile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import UserAvatar from '../shared/user-avatar';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useUser, useFirestore, FirestorePermissionError, errorEmitter } from '@/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { getUsersByIds } from '@/lib/actions';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'message': return <MessageSquare className="h-5 w-5" />;
    case 'connection': return <UserCheck className="h-5 w-5" />;
    case 'match': return <Users className="h-5 w-5" />;
    default: return <Bell className="h-5 w-5" />;
  }
};

export default function Notifications() {
  const { user: authUser } = useUser();
  const db = useFirestore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [senders, setSenders] = useState<Map<string, FullUserProfile>>(new Map());
  const [isPending, startTransition] = useTransition();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!authUser || !db) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', authUser.id)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const notifs = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Notification)
      );
      
      notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNotifications(notifs);

      // Optimize sender fetching: Only fetch if we don't already have them in the Map
      const senderIds = [...new Set(notifs.map((n) => n.senderId).filter(Boolean))] as string[];
      
      if (senderIds.length > 0) {
        setSenders(prev => {
          const idsToFetch = senderIds.filter((id) => !prev.has(id));
          if (idsToFetch.length > 0) {
            // Move fetch outside the Map update to prevent blocking
            getUsersByIds(idsToFetch).then(users => {
              if (users.length > 0) {
                setSenders(current => {
                  const next = new Map(current);
                  users.forEach(u => next.set(u.id, u));
                  return next;
                });
              }
            });
          }
          return prev;
        });
      }
    }, (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'notifications',
        operation: 'list'
      }));
    });

    return () => unsubscribe();
  }, [authUser, db]);

  const markAllAsRead = () => {
    if (!authUser || unreadCount === 0 || !db) return;
    
    startTransition(async () => {
      const batch = writeBatch(db);
      notifications.forEach((n) => {
        if (!n.isRead) {
          batch.update(doc(db, 'notifications', n.id), { isRead: true });
        }
      });

      try {
        await batch.commit();
      } catch (err) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'notifications',
          operation: 'write'
        }));
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className={cn("h-5 w-5", isPending && "animate-pulse")} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0 shadow-xl border-muted" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Notifications
            </CardTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="text-xs h-8" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="p-0 max-h-[400px] overflow-y-auto overflow-x-hidden">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                const sender = notification.senderId ? senders.get(notification.senderId) : null;
                return (
                  <div key={notification.id}>
                    <Link
                      href={notification.link}
                      className={cn(
                        'flex items-start gap-3 p-4 transition-colors hover:bg-muted/50',
                        !notification.isRead && 'bg-primary/5'
                      )}
                    >
                      {sender ? (
                        <UserAvatar name={sender.name} avatarUrl={sender.avatarUrl} className="h-9 w-9" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center bg-secondary rounded-full">
                          {getIcon(notification.type)}
                        </div>
                      )}
                      <div className="flex-1 space-y-1 overflow-hidden">
                        <p className="text-sm leading-snug break-words">
                          {sender ? (
                            <><strong>{sender.name}</strong> {notification.text.replace(sender.name, '').trim()}</>
                          ) : (
                            notification.text
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                      )}
                    </Link>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-2">
                <Bell className="h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
