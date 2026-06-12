import { supabase } from "@/lib/supabase";

export async function ensureFamily(userId: string): Promise<string | null> {
  // Check if user already belongs to a family
  const { data: membership } = await (supabase
    .from("family_members" as any)
    .select("family_id")
    .eq("user_id", userId)
    .eq("status", "accepted")
    .single() as any);

  if (membership?.family_id) return membership.family_id as string;

  // Create a new family and add user as owner
  const { data: family } = await (supabase
    .from("families" as any)
    .insert({ owner_id: userId } as any)
    .select("id")
    .single() as any);

  if (!family) return null;

  await (supabase.from("family_members" as any).insert({
    family_id: family.id,
    user_id: userId,
    role: "owner",
    status: "accepted",
  } as any) as any);

  return family.id as string;
}

export async function inviteConjoint(
  familyId: string,
  invitedEmail: string
): Promise<{ error: string | null }> {
  const token = crypto.randomUUID();
  const redirectTo = `${window.location.origin}/auth/accept-invite?token=${token}`;

  // Upsert pending invitation
  const { error: dbErr } = await (supabase.from("family_members" as any).upsert({
    family_id: familyId,
    invited_email: invitedEmail,
    role: "parent",
    status: "pending",
    token,
  } as any) as any);

  if (dbErr) return { error: dbErr.message };

  // Send magic-link invitation email
  const { error: authErr } = await supabase.auth.signInWithOtp({
    email: invitedEmail,
    options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
  });

  return { error: authErr?.message ?? null };
}

export async function acceptInvite(
  token: string,
  userId: string
): Promise<{ error: string | null }> {
  const { data, error: fetchErr } = await (supabase
    .from("family_members" as any)
    .select("id, status")
    .eq("token", token)
    .single() as any);

  if (fetchErr || !data) return { error: "Invitation introuvable ou expirée." };
  if ((data as any).status === "accepted") return { error: null }; // already done

  const { error: updateErr } = await (supabase
    .from("family_members" as any)
    .update({ user_id: userId, status: "accepted" } as any)
    .eq("token", token) as any);

  return { error: updateErr?.message ?? null };
}
