import { homeMetadata } from './metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return homeMetadata;
}; 