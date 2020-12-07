/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Limit TODO/FIXME tags amount in file
 */
export interface MaxTagsOptions {
  /**
   * Scope: Project
   */
  project?: {
    /**
     * Max allowed TOOD/FIXME tags
     */
    max?: number;
    /**
     * Is scope disabled
     */
    disabled?: boolean;
    [k: string]: unknown;
  };
  /**
   * Scope: File
   */
  file?: {
    /**
     * Max allowed TOOD/FIXME tags
     */
    max?: number;
    /**
     * Is scope disabled
     */
    disabled?: boolean;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
