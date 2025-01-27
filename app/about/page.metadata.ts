import { aboutMetadata } from '../metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return aboutMetadata;
}; 