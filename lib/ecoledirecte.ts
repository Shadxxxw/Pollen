import { z } from 'zod';

const ECOLEDIRECTE_API_BASE = 'https://api.ecoledirecte.com/v3';

function getApiVersion() {
  return process.env.ECOLEDIRECTE_API_VERSION ?? '4.43.0';
}

export const ecoleDirecteAccountSchema = z.object({
  id: z.number(),
  typeCompte: z.string(),
  prenom: z.string(),
  nom: z.string(),
  classe: z
    .object({
      libelle: z.string().optional()
    })
    .optional()
});

const securityQuestionSchema = z.object({
  id: z.string(),
  libelle: z.string()
});

const ecoleDirecteLoginResponseSchema = z.object({
  code: z.number(),
  token: z.string().optional(),
  message: z.string().optional(),
  data: z
    .object({
      accounts: z.array(ecoleDirecteAccountSchema).optional(),
      question: securityQuestionSchema.optional()
    })
    .passthrough()
});

export type EcoleDirecteAccount = z.infer<typeof ecoleDirecteAccountSchema>;
export type SecurityQuestion = z.infer<typeof securityQuestionSchema>;

type LoginResultWithSecurityQuestion = {
  requiresSecurityQuestion: true;
  question: SecurityQuestion;
};

type LoginResultSuccess = {
  requiresSecurityQuestion: false;
  token: string;
  accounts: EcoleDirecteAccount[];
};

export type EcoleDirecteLoginResult = LoginResultWithSecurityQuestion | LoginResultSuccess;

export async function ecoleDirecteLogin(
  input: { identifiant: string; motdepasse: string }
): Promise<EcoleDirecteLoginResult> {
  const version = getApiVersion();

  const body = new URLSearchParams();
  body.set(
    'data',
    JSON.stringify({
      identifiant: input.identifiant,
      motdepasse: input.motdepasse
    })
  );

  const res = await fetch(`${ECOLEDIRECTE_API_BASE}/login.awp?v=${encodeURIComponent(version)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body,
    cache: 'no-store'
  });

  const json = await res.json().catch(() => null);
  const parsed = ecoleDirecteLoginResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error('Réponse EcoleDirecte inattendue.');
  }

  const data = parsed.data;

  if (data.code !== 200) {
    throw new Error(data.message || 'Identifiant et/ou mot de passe invalide.');
  }

  if (data.data.question) {
    return {
      requiresSecurityQuestion: true,
      question: data.data.question
    };
  }

  if (!data.token || !data.data.accounts) {
    throw new Error('Token ou comptes non reçus d\'EcoleDirecte.');
  }

  return {
    requiresSecurityQuestion: false,
    token: data.token,
    accounts: data.data.accounts
  };
}

const ecoleDirecteQuestionResponseSchema = z.object({
  code: z.number(),
  token: z.string().optional(),
  message: z.string().optional(),
  data: z
    .object({
      accounts: z.array(ecoleDirecteAccountSchema)
    })
    .passthrough()
});

export async function ecoleDirecteAnswerSecurityQuestion(
  input: {
    identifiant: string;
    motdepasse: string;
    questionId: string;
    reponse: string;
  }
): Promise<{ token: string; accounts: EcoleDirecteAccount[] }> {
  const version = getApiVersion();

  const body = new URLSearchParams();
  body.set(
    'data',
    JSON.stringify({
      identifiant: input.identifiant,
      motdepasse: input.motdepasse,
      question: {
        id: input.questionId,
        reponse: input.reponse
      }
    })
  );

  const res = await fetch(`${ECOLEDIRECTE_API_BASE}/login.awp?v=${encodeURIComponent(version)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body,
    cache: 'no-store'
  });

  const json = await res.json().catch(() => null);
  const parsed = ecoleDirecteQuestionResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error('Réponse EcoleDirecte inattendue.');
  }

  const data = parsed.data;

  if (data.code !== 200) {
    throw new Error(data.message || 'Réponse incorrecte.');
  }

  if (!data.token) {
    throw new Error('Token non reçu d\'EcoleDirecte.');
  }

  return {
    token: data.token,
    accounts: data.data.accounts
  };
}
