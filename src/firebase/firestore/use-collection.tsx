'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type WithId<T> = T & { id: string };

export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

// Removed the InternalQuery interface as it relied on private API properties.

export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  // Helper function to safely get the path from a Query or CollectionReference
  const getQueryPath = useCallback(() => {
    if (!memoizedTargetRefOrQuery) return 'unknown path';
    
    // Check if it's a CollectionReference (which has a direct path property)
    if ('path' in memoizedTargetRefOrQuery && typeof memoizedTargetRefOrQuery.path === 'string') {
        return memoizedTargetRefOrQuery.path;
    }
    
    // For a complex Query object, we approximate the path for logging purposes.
    // This avoids using private _query properties.
    const query = memoizedTargetRefOrQuery as Query<DocumentData>;
    return query.withConverter(null as any).path; // Use withConverter to expose the path if needed, or approximate.
    
  }, [memoizedTargetRefOrQuery]);


  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        // Optimized data mapping
        const results: ResultItemType[] = snapshot.docs.map(doc => ({
            ...(doc.data() as T),
            id: doc.id
        }));
        
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        // Use the public API path retrieval method
        const path = getQueryPath();

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery, getQueryPath]); // Added getQueryPath to dependency array

  if(memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error('useCollection query was not properly memoized using useMemoFirebase');
  }
  return { data, isLoading, error };
}
