import profilePhoto from "../../public/images/david-profile.png";

/**
 * Personal information and links used across the site.
 * Links set to `null` are hidden everywhere until you fill them in.
 */
export const site = {
  name: "David Sánchez Casillas",
  shortName: "DS",
  email: "davidsanchezcasillas@gmail.com",
  linkedin: "https://www.linkedin.com/in/david-sanchez-casillas-664756383" as string | null,
  /** TODO: add your GitHub profile URL, e.g. "https://github.com/your-user". */
  github: null as string | null,
  /** Place your CV at /public/cv/David-Sanchez-Casillas-CV.pdf */
  cv: "/cv/David-Sanchez-Casillas-CV.pdf",
  /** Static import: gives next/image intrinsic size and an automatic blur placeholder. */
  photo: profilePhoto,
};

export const navSections = ["about", "experience", "projects", "skills", "contact"] as const;

export type NavSection = (typeof navSections)[number];
