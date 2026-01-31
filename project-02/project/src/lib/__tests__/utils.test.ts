import { cn } from '../utils';

describe('cn', () => {
  it('should combine class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional class names', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('should merge and resolve Tailwind CSS conflicts', () => {
    // twMerge handles conflicts by taking the last valid class
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500', 'text-green-500')).toBe('text-green-500');
  });

  it('should handle a mix of conditional and conflicting class names', () => {
    expect(cn('p-4', true && 'text-lg', false && 'text-sm', 'p-2')).toBe('text-lg p-2');
  });

  it('should return an empty string if no inputs are provided', () => {
    expect(cn()).toBe('');
  });

  it('should ignore null, undefined, and empty strings', () => {
    expect(cn('class1', null, undefined, '', 'class2')).toBe('class1 class2');
  });
});
