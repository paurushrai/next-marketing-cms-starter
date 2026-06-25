import { describe, it } from "vitest";

import { runCmsProviderContract } from "./cms-provider.contract";

/**
 * Payload must satisfy the SAME contract as any other provider. This requires
 * a running, seeded MongoDB, so it's opt-in: run with
 *   RUN_PAYLOAD_CONTRACT=1 DATABASE_URI=... pnpm test
 * Otherwise it's skipped, keeping CI green without a database.
 */
const RUN = process.env.RUN_PAYLOAD_CONTRACT === "1";

if (RUN) {
  // Imported lazily so the suite never pulls in Payload/DB unless enabled.
  const { payloadProvider } = await import("@/lib/cms/payload-provider");
  runCmsProviderContract("payloadProvider", () => payloadProvider);
} else {
  describe.skip("CmsProvider contract: payloadProvider (needs seeded MongoDB)", () => {
    it("opt in with RUN_PAYLOAD_CONTRACT=1 and DATABASE_URI", () => {
      // Intentionally empty — placeholder for the skipped suite.
    });
  });
}
