"use client";

import { useEffect, useState } from "react";

const REAL_NAME = "Aakash Yadav";
const ALIAS = "SkyGuy";
const RANDOM_CHARS = "!@#$%^&*?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SHOW_NAME_DURATION = 10000;

function getRandomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function scrambleWithLocks(target: string, lockedCount: number): string {
  return target
    .split("")
    .map((char, i) => (i < lockedCount ? char : getRandomChar()))
    .join("");
}

type Phase = "scrambling" | "typing" | "done";

export function TypewriterName() {
  const [displayedName, setDisplayedName] = useState(ALIAS);
  const [currentTarget, setCurrentTarget] = useState(ALIAS);
  const [lockedCount, setLockedCount] = useState(ALIAS.length);
  const [phase, setPhase] = useState<Phase>("done");

  useEffect(() => {
    const target = currentTarget;
    const setupTimeout = setTimeout(() => {
      setLockedCount(0);
      setPhase("scrambling");

      const scrambleInterval = setInterval(() => {
        setDisplayedName(scrambleWithLocks(target, 0));
      }, 50);

      const transitionTimeout = setTimeout(() => {
        clearInterval(scrambleInterval);
        setPhase("typing");
      }, 1200);

      return () => {
        clearInterval(scrambleInterval);
        clearTimeout(transitionTimeout);
      };
    }, 0);

    return () => clearTimeout(setupTimeout);
  }, [currentTarget]);

  useEffect(() => {
    if (phase !== "typing") return;

    const typeTimeout = setTimeout(() => {
      const newLockedCount = lockedCount + 1;
      setDisplayedName(scrambleWithLocks(currentTarget, newLockedCount));
      setLockedCount(newLockedCount);
      if (newLockedCount >= currentTarget.length) {
        setPhase("done");
      }
    }, 100);

    return () => clearTimeout(typeTimeout);
  }, [phase, lockedCount, currentTarget]);

  useEffect(() => {
    if (phase !== "done") return;

    const doneTimeout = setTimeout(() => {
      const nextTarget = currentTarget === ALIAS ? REAL_NAME : ALIAS;
      setCurrentTarget(nextTarget);
    }, SHOW_NAME_DURATION);

    return () => clearTimeout(doneTimeout);
  }, [phase, currentTarget]);

  const showAlias = currentTarget === ALIAS && phase === "done";
  const showRealName = currentTarget === REAL_NAME && phase === "done";

  if (showRealName) {
    return (
      <span className="inline-block min-w-[11ch] font-headline text-2xl font-light tracking-tight text-on-background italic">
        {REAL_NAME}
      </span>
    );
  }

  if (showAlias) {
    return (
      <span className="inline-block min-w-[11ch] font-headline text-2xl font-light tracking-tight text-on-background italic">
        {ALIAS}
      </span>
    );
  }

  return (
    <span className="inline-block min-w-[11ch] font-headline text-2xl font-light tracking-tight text-on-background italic">
      {displayedName}
    </span>
  );
}
