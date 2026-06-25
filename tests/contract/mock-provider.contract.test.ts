import { mockProvider } from "@/lib/cms/mock-provider";

import { runCmsProviderContract } from "./cms-provider.contract";

// The shipped mock provider must honour the contract.
runCmsProviderContract("mockProvider", () => mockProvider);
