import { contactMetadata } from '../metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return contactMetadata;
}; 