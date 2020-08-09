declare module 'ember-changeset-validations/validators' {
  import { ValidationResult } from 'ember-changeset/types';

  export function validatePresence(options: {} | boolean): ValidationResult;
  export function validateLength(options: {}): ValidationResult;
  export function validateNumber(options: {}): ValidationResult;
  export function validateInclusion(options: {}): ValidationResult;
  export function validateExclusion(options: {}): ValidationResult;
  export function validateFormat(options: {}): ValidationResult;
  export function validateConfirmation(options: {}): ValidationResult;
}
