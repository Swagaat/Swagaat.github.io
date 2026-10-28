"use strict";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Theme toggle ---------- */
const themeToggle = document.querySelector("[data-theme-toggle]");
if (themeToggle) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");
  const label = () => themeToggle.setAttribute("aria-label", `Switch to ${currentTheme() === "dark" ? "light" : "dark"} theme`);
  label();
  prefersDark.addEventListener("change", label);
  themeToggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable; theme lasts for this page only */ }
    label();
  });
}

/* ---------- Header: scrolled state + mobile menu ---------- */
const header = document.querySelector("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
if (menuToggle && nav) {
  const setOpen = open => {
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuToggle.addEventListener("click", () => setOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", event => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); menuToggle.focus(); }
  });
  document.addEventListener("click", event => {
    if (nav.classList.contains("is-open") && !nav.contains(event.target) && !menuToggle.contains(event.target)) setOpen(false);
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", event => { if (event.matches) setOpen(false); });
}

/* ---------- Active section in nav (single-page index only) ---------- */
const sectionLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
if (sectionLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(sectionLinks.map(link => [link.hash.slice(1), link]));
  const sections = [...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);
  const visible = new Set();
  const update = () => {
    const current = sections.find(section => visible.has(section));
    sectionLinks.forEach(link => link.removeAttribute("aria-current"));
    if (current) byId.get(current.id).setAttribute("aria-current", "true");
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
    update();
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(section => observer.observe(section));
}

/* ---------- Reveal on scroll ---------- */
const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(item => item.classList.add("is-visible"));
} else {
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealItems.forEach(item => revealer.observe(item));
}

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = String(new Date().getFullYear()); });

/* ---------- Copy email ---------- */
const copyEmail = document.querySelector("[data-copy-email]");
if (copyEmail) {
  copyEmail.addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
      status.textContent = "Email address copied to your clipboard.";
    } catch {
      status.textContent = "Couldn't copy automatically. Please select the address above or use the email link.";
    }
  });
}

/* ---------- Calculator (extra.html) ---------- */
const calculator = document.querySelector("#calculator");
if (calculator) {
  const display = document.querySelector("#display");
  let current = "0", previous = null, operator = null, replace = true;
  const render = () => { display.textContent = current; };
  function clear() { current = "0"; previous = null; operator = null; replace = true; }
  function compute() {
    if (operator === null || replace) return;
    const a = previous, b = Number(current);
    const result = operator === "+" ? a + b : operator === "-" ? a - b : operator === "*" ? a * b : a / b;
    current = Number.isFinite(result) ? String(Number(result.toPrecision(12))) : "Cannot divide by zero";
    previous = null; operator = null; replace = true;
  }
  function input(key) {
    if (key === "C") clear();
    else if (/^[0-9.]$/.test(key)) {
      if (replace) { current = "0"; replace = false; }
      if (key === ".") { if (!current.includes(".")) current += "."; }
      else if (current.length < 16) current = current === "0" ? key : current + key;
    } else if (key === "=") compute();
    else if (["+", "-", "*", "/"].includes(key)) {
      if (operator && !replace) compute();
      if (Number.isFinite(Number(current))) { previous = Number(current); operator = key; replace = true; }
    }
    render();
  }
  calculator.addEventListener("click", event => {
    const button = event.target.closest("button[data-key]");
    if (button) input(button.dataset.key);
  });
  document.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    // Let Enter activate a focused link or button through its native click behavior.
    if (event.key === "Enter" && event.target.closest("a, button")) return;
    const key = event.key === "Enter" ? "=" : event.key === "Escape" ? "C" : event.key;
    if (/^[0-9.+*/=\-]$/.test(key) || key === "C") { event.preventDefault(); input(key); }
  });
}
