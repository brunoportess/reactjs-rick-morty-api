import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
import 'fast-text-encoding';

global.TextEncoder = TextEncoder;