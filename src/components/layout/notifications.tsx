"use client";

import { useState, useEffect } from 'react';
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
import { useUser, useFirestore } from '@/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  writeBatch,
  orderBy,
} from 'firebase/firestore';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-5 w-5" />;
    case 'connection':
      return <UserCheck className="h-5 w-5" />;
    case 'match':
      return <Users className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

export default function Notifications() {
  const { user: authUser } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [senders, setSenders] = useState<Map<string, FullUserProfile>>(
    new Map()
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const db = useFirestore();

  useEffect(() => {
    if (!authUser || !db) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', authUser.uid),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const notifs = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Notification)
      );
      setNotifications(notifs);

      const senderIds = [
        ...new Set(notifs.map((n) => n.senderId).filter(Boolean)),
      ] as string[];
      if (senderIds.length > 0) {
        const newSenders = new Map(senders);
        const idsToFetch = senderIds.filter((id) => !newSenders.has(id));
        if (idsToFetch.length > 0) {
          const usersQuery = query(
            collection(db, 'users'),
            where('id', 'in', idsToFetch)
          );
          const usersSnap = await getDocs(usersQuery);
          usersSnap.forEach((doc) => {
            newSenders.set(doc.id, doc.data() as FullUserProfile);
          });
          setSenders(newSenders);
        }
      }
    });

    return () => unsubscribe();
  }, [authUser, senders, db]);

  const markAllAsRead = async () => {
    if (!authUser || unreadCount === 0 || !db) return;
    const batch = writeBatch(db);
    notifications.forEach((n) => {
      if (!n.isRead) {
        const notifRef = doc(db, 'notifications', n.id);
        batch.update(notifRef, { isRead: true });
      }
    });
    await batch.commit();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0" align="end">
        <Card className="border-0">
          <CardHeader className="flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-lg">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                const sender = notification.senderId
                  ? senders.get(notification.senderId)
                  : null;
                return (
                  <div key={notification.id}>
                    <Link
                      href={notification.link}
                      className={cn(
                        'flex items-start gap-3 p-4 hover:bg-accent',
                        !notification.isRead && 'bg-accent/50'
                      )}
                    >
                      {sender ? (
                        <UserAvatar
                          name={sender.name}
                          avatarUrl={sender.avatarUrl}
                        />
                      ) : (
                        <div className="p-2 bg-secondary rounded-full">
                          {getIcon(notification.type)}
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: sender
                              ? notification.text.replace(
                                  sender.name,
                                  `<strong>${sender.name}</strong>`
                                )
                              : notification.text,
                          }}
                        ></p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                      )}
                    </Link>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                );
              })
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No new notifications
              </p>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
