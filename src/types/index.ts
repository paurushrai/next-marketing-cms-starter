/**
 * Shared app-wide types. Re-export the CMS content model so consumers have a
 * single import surface; add cross-cutting types here as the app grows.
 */
export type {
  ContentBlock,
  ContentPage,
  PageSeo,
  SlugRef,
} from "@/lib/cms/types";
