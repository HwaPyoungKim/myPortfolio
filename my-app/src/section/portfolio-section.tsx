"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Languages,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import type { Project, Skill } from "@/types/portfolio";

function useRaw<T>(namespace: string, key: string): T {
  return useTranslations(namespace).raw(key) as T;
}

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function PortfolioSections() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    window.location.pathname = window.location.pathname.replace(
      `/${locale}`,
      `/${nextLocale}`,
    );
  };

  const navItems = ["home", "about", "skills", "projects", "contact"];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            A
          </span>
          <span>Adilaki</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {t(item)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={switchLocale}
            aria-label={t("languageAria")}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t("themeAria")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  const t = useTranslations("hero");
  const stats = useRaw<Array<{ value: string; label: string }>>(
    "hero",
    "stats",
  );

  return (
    <section id="home" className="pt-28 md:pt-32">
      <div className="container grid min-h-[calc(100vh-5rem)] items-center gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Badge variant="outline" className="mb-5">
            {t("availability")}
          </Badge>
          <p className="text-sm font-semibold uppercase text-muted-foreground">
            {t("hello")}
          </p>
          <h1 className="mt-4 text-5xl font-semibold sm:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
          <p className="mt-5 text-2xl font-medium text-primary md:text-3xl">
            {t("subtitle")}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button size="lg">
                {t("projects")}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <a href="/cv.pdf" download>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("cv")}
              </Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                {t("contact")}
              </Button>
            </a>
          </div>
        </Reveal>
        <Reveal>
          <Card>
            <CardHeader>
              <CardTitle>Developer.java</CardTitle>
              <CardDescription>Backend portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-md bg-muted p-5 text-sm leading-7">
                <code>{`public class Developer {
  String focus = "Backend";
  List<String> stack = List.of(
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Docker"
  );
}`}</code>
              </pre>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-md border p-4">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-shell">
      <Reveal>
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy">{t("intro")}</p>
      </Reveal>
    </section>
  );
}

function SkillsSection() {
  const t = useTranslations("skills");
  const skills = useRaw<Skill[]>("skills", "items");

  return (
    <section id="skills" className="bg-muted/45">
      <div className="section-shell">
        <Reveal>
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy">{t("description")}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <Reveal key={skill.name}>
              <Card className="h-full shadow-none">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle>{skill.name}</CardTitle>
                    {skill.years ? (
                      <Badge variant="outline">{skill.years}</Badge>
                    ) : null}
                  </div>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const t = useTranslations("projects");
  const projects = useRaw<Project[]>("projects", "items");

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy">{t("description")}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <Card className="h-full shadow-none">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <CardTitle>{project.name}</CardTitle>
                  {project.featured ? <Badge>{t("featured")}</Badge> : null}
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {t("demo")}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="section-shell">
      <Reveal>
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy">{t("description")}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <a
          href="mailto:hello@adilaki.dev"
          className="rounded-md border p-4 hover:border-primary/40"
        >
          <Mail className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">{t("email")}</p>
          <p className="font-medium">hello@adilaki.dev</p>
        </a>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">{t("location")}</p>
          <p className="font-medium">{t("locationValue")}</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>{t("copyright")}</p>
        <p>{t("stack")}</p>
      </div>
    </footer>
  );
}
