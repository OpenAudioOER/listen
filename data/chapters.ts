import { Book } from '../types';
import { amGovChapters } from './books/am-gov-4e';
import { amGov3eChapters } from './books/am-gov-3e';
import { introSocChapters } from './books/sociology-3e';
import { usHistoryChapters } from './books/us-history';
import { worldHistChapters } from './books/world-history';

// --- THEMES ---

// American Government 4e: Brand Red (#cf013d), Accent Cyan (#03c7dd)
const amGovTheme = {
  brand50: '#fff0f2',
  brand100: '#ffe1e5',
  brand500: '#cf013d', 
  brand600: '#b30034', 
  brand700: '#91002a',
  brand900: '#66001d',
  accent500: '#03c7dd', 
  accent600: '#00acc1', 
  accent700: '#00838f', 
};

// American Government 3e: Brand Cyan (#03c7e2 -> #009ec8 for a11y), Accent Red (#cc223a)
const amGov3eTheme = {
  brand50: '#e0f7fa',
  brand100: '#b2ebf2',
  brand500: '#009ec8', 
  brand600: '#0085a8', 
  brand700: '#006b87',
  brand900: '#004d61',
  accent500: '#cc223a', 
  accent600: '#a81b30',
  accent700: '#8a1627',
};

// Introduction to Sociology 3e: Brand Navy (#273a7a), Accent Yellow (#fed400)
const socTheme = {
  brand50: '#e8eaf6',
  brand100: '#c5cae9',
  brand500: '#273a7a', 
  brand600: '#1f2f63', 
  brand700: '#1a2752',
  brand900: '#121b3a',
  accent500: '#fed400',
  accent600: '#e6c000', 
  accent700: '#cca300', 
};

// U.S. History: Brand Deep Blue (#253472), Accent Orange (#f48048)
const usHistoryTheme = {
  brand50: '#eef0f7',
  brand100: '#dce1f0',
  brand500: '#253472', 
  brand600: '#1e2a5c', 
  brand700: '#172147',
  brand900: '#101733',
  accent500: '#f48048',
  accent600: '#d96e3b', 
  accent700: '#bf5d30', 
};

// World History Vol 1: Brand Green (#2eab83 -> #20856d for a11y), Accent Teal (#01a093)
const worldHistTheme = {
  brand50: '#e0f2f1',
  brand100: '#b2dfdb',
  brand500: '#20856d',
  brand600: '#196b57', 
  brand700: '#135242',
  brand900: '#0d382e',
  accent500: '#01a093',
  accent600: '#00857a',
  accent700: '#006960',
};

export const library: Record<string, Book> = {
  'am-gov-4e': {
    id: 'am-gov-4e',
    title: 'American Government 4e',
    author: 'Glen Krutz, Sylvie Waskiewicz',
    description: 'Explore the foundations of U.S. politics and government with comprehensive audio narrations for every chapter.',
    coverImage: '/cover.png',
    coverImageWide: '/cover-wide.png',
    theme: amGovTheme,
    chapters: amGovChapters
  },
  'intro-soc-3e': {
    id: 'intro-soc-3e',
    title: 'Introduction to Sociology 3e',
    author: 'Tonja R. Conerly, Kathleen Holmes, Asha Lal Tamang',
    description: 'Dive into the study of society, social behavior, and human interaction, enhanced with accessible audio for on-the-go learning.',
    coverImage: '/cover_soc.png',
    coverImageWide: '/cover_soc-wide.png',
    theme: socTheme,
    chapters: introSocChapters
  },
  'us-history': {
    id: 'us-history',
    title: 'U.S. History',
    author: 'P. Scott Corbett, Volker Janssen, John M. Lund',
    description: 'Journey through the pivotal events and figures that shaped the nation, featuring engaging audio narrations to bring history to life.',
    coverImage: '/cover_us_history.png',
    coverImageWide: '/cover_us_history-wide.png',
    theme: usHistoryTheme,
    chapters: usHistoryChapters
  },
  'world-hist-v1': {
    id: 'world-hist-v1',
    title: 'World History, Volume 1: to 1500',
    author: 'Ann Kordas, Ryan J. Lynch, Brooke Nelson',
    description: 'Discover the diverse civilizations and global connections of the ancient and medieval world, supported by full audio chapter guides.',
    coverImage: '/cover_world_hist.png',
    coverImageWide: '/cover_world_hist-wide.png',
    theme: worldHistTheme,
    chapters: worldHistChapters
  },
  'am-gov-3e': {
    id: 'am-gov-3e',
    title: 'American Government 3e',
    author: 'Glen Krutz, Sylvie Waskiewicz',
    description: 'Master the core concepts of American democracy and political systems with clear, professional audio narrations.',
    coverImage: '/cover_am_gov_3e.png',
    coverImageWide: '/cover_am_gov_3e-wide.png',
    theme: amGov3eTheme,
    chapters: amGov3eChapters
  }
};