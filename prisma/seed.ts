import { hashPassword } from "../src/lib/password";

async function main() {
  const passwordHash = await hashPassword(process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!");

  console.log("Seed template ready", {
    adminEmail: process.env.SEED_ADMIN_EMAIL ?? "admin@example.com",
    passwordHashPreview: `${passwordHash.slice(0, 16)}...`
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
