/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { RootState } from '@/store/store';
import Image from "next/image";

export default function RootPage() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    redirect('/home');
  }

  return null;
}
