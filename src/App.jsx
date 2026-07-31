import React, { useState, useMemo } from "react";
import { GLOSSARY as GLOSSARY_DB, TOOLS, CERTIFICATIONS, MITRE_TACTICS, CHEATSHEET, CAREER_PATHS } from "./cyberdb.js";

/* ---------------------------------------------
   GHOSTWARE — cybersecurity learning hub
   Fully static: no API key, nothing to configure.
   Glossary/Tools/Certs/MITRE/Cheatsheet/Careers all
   live in src/cyberdb.js — edit that file to expand.
---------------------------------------------- */

const GLOSSARY = GLOSSARY_DB.map((g) => [g.term, g.def]);

const _OLD_GLOSSARY_UNUSED = [
  ["CIA Triad", "The three goals of security: Confidentiality, Integrity, Availability. Every control maps back to one of these."],
  ["Zero-day", "A vulnerability unknown to the vendor, with no patch available yet — actively dangerous because defenders can't fix what they don't know about."],
  ["Kerberoasting", "Requesting service tickets for Windows accounts with an SPN, then cracking the ticket offline to recover the account password."],
  ["Pass-the-hash", "Authenticating to a system using a stolen password hash directly, without ever knowing the plaintext password."],
  ["Lateral movement", "Moving from one compromised machine to others inside the same network to expand access."],
  ["Privilege escalation", "Turning limited access into higher-level access — user to admin, or admin to SYSTEM."],
  ["Persistence", "Techniques that let an attacker keep access to a system even after a reboot or password change."],
  ["C2 (Command & Control)", "Infrastructure an attacker uses to send instructions to and receive data from compromised machines."],
  ["Exploit", "Code or a technique that takes advantage of a specific vulnerability."],
  ["Payload", "The part of an attack that does the actual damage or action — e.g. a reverse shell dropped after an exploit runs."],
  ["Vulnerability", "A weakness in software, hardware, or process that could be exploited."],
  ["Patch", "A vendor-released fix for a known vulnerability."],
  ["Firewall", "A system that filters network traffic based on rules, blocking or allowing connections."],
  ["IDS / IPS", "Intrusion Detection/Prevention System — monitors traffic for malicious patterns; IPS can actively block them."],
  ["SIEM", "Security Information and Event Management — aggregates and correlates logs from across an environment to spot threats."],
  ["EDR", "Endpoint Detection and Response — software that monitors individual devices for malicious behavior in real time."],
  ["Sysmon", "A free Microsoft tool that logs detailed system activity on Windows, widely used for threat detection."],
  ["MITRE ATT&CK", "A public knowledge base cataloguing real-world attacker tactics and techniques, used as a common reference by red and blue teams."],
  ["OSINT", "Open-Source Intelligence — gathering information about a target from publicly available sources."],
  ["Phishing", "Tricking someone into giving up credentials or running malware, usually via a fake email or site."],
  ["Social engineering", "Manipulating people (rather than systems) into breaking security procedures."],
  ["Ransomware", "Malware that encrypts a victim's files and demands payment for the decryption key."],
  ["Malware", "Any software designed to cause harm — viruses, worms, trojans, ransomware, spyware."],
  ["Rootkit", "Malware designed to hide its own presence and maintain privileged access on a system."],
  ["Botnet", "A network of compromised machines controlled remotely, often used for DDoS or spam."],
  ["DDoS", "Distributed Denial of Service — overwhelming a system with traffic from many sources to take it offline."],
  ["Man-in-the-middle", "Intercepting communication between two parties without either realizing it."],
  ["SQL injection", "Inserting malicious SQL through user input to manipulate or extract data from a database."],
  ["XSS", "Cross-Site Scripting — injecting malicious scripts into a web page that run in another user's browser."],
  ["CSRF", "Cross-Site Request Forgery — tricking a logged-in user's browser into performing an unwanted action on a site."],
  ["Buffer overflow", "Writing more data to memory than it can hold, potentially letting an attacker execute arbitrary code."],
  ["NTLM", "An older Windows authentication protocol, still widely present and a common attack target."],
  ["Active Directory", "Microsoft's directory service for managing users, computers, and permissions across a Windows network."],
  ["Kerberos", "The default authentication protocol in Active Directory, using tickets instead of passwords on the wire."],
  ["LSASS", "A Windows process that handles authentication and stores credentials in memory — a prime target for credential theft."],
  ["Mimikatz", "A well-known tool for extracting credentials, tickets, and hashes from Windows memory."],
  ["Metasploit", "A widely used exploitation framework for developing and running attacks against known vulnerabilities."],
  ["Nmap", "A network scanning tool used to discover hosts, open ports, and running services."],
  ["Wireshark", "A packet-capture tool for inspecting network traffic in detail."],
  ["Burp Suite", "A toolkit for testing and intercepting web application traffic, central to web app pentesting."],
  ["John the Ripper", "A password-cracking tool supporting many hash formats."],
  ["Hashcat", "A fast, GPU-accelerated password-cracking tool."],
  ["Hydra", "A tool for brute-forcing login credentials across many protocols."],
  ["VPN", "Encrypts and tunnels network traffic, hiding it from the local network and masking origin."],
  ["Tor", "A network that routes traffic through multiple relays to anonymize the source."],
  ["Steganography", "Hiding data inside another file, like an image, so its presence isn't obvious."],
  ["Honeypot", "A decoy system designed to attract attackers so defenders can study or detect them."],
  ["Sandbox", "An isolated environment used to safely run and observe suspicious code."],
  ["Threat hunting", "Proactively searching a network for signs of compromise, rather than waiting for an alert."],
  ["Red team", "The offensive side — simulating real attacks to test defenses."],
  ["Blue team", "The defensive side — detecting, responding to, and preventing attacks."],
  ["Purple team", "A collaborative exercise where red and blue teams work together to improve detection and response."],
  ["Penetration test", "An authorized, scoped simulated attack against a system to find exploitable weaknesses."],
  ["CVE", "Common Vulnerabilities and Exposures — a standardized ID for a publicly known vulnerability."],
  ["CVSS", "Common Vulnerability Scoring System — a numeric severity score for a vulnerability."],
  ["Zero trust", "A security model that assumes no user or device is trusted by default, even inside the network."],
  ["Encryption", "Converting data into unreadable form, reversible only with the correct key."],
  ["Hashing", "A one-way function converting data into a fixed-length string, used to verify integrity or store passwords."],
  ["Salting", "Adding random data to a password before hashing, to defeat precomputed cracking tables."],
  ["Two-factor authentication", "Requiring a second proof of identity beyond a password — a code, key, or biometric."],
  ["Air gap", "Physically isolating a system from any network, including the internet."],
  ["Attack surface", "The total set of points where an attacker could try to get into a system."],
  ["Threat actor", "An individual or group responsible for carrying out an attack."],
  ["APT", "Advanced Persistent Threat — a sophisticated, often state-backed attacker focused on long-term access."],
  ["IOC", "Indicator of Compromise — evidence (a hash, IP, file, etc.) that a system has been breached."],
  ["TTP", "Tactics, Techniques, and Procedures — the behavioral patterns that describe how an attacker operates."],
  ["Kill chain", "A model breaking an attack into stages, from recon through to final objective, used to plan defenses at each stage."],
  ["Reconnaissance", "The information-gathering phase before an attack begins."],
  ["Enumeration", "Actively probing a target to extract detailed information like usernames, shares, or services."],
  ["Living off the land", "Using legitimate, built-in system tools to carry out an attack, to avoid detection by traditional malware scanners."],
  ["Golden ticket", "A forged Kerberos ticket giving an attacker unlimited access to an Active Directory domain."],
  ["Pivoting", "Using a compromised machine as a launch point to reach otherwise unreachable parts of a network."],
  ["Exfiltration", "The unauthorized transfer of data out of a target network."],
  ["Watering hole attack", "Compromising a website the target is known to visit, rather than attacking them directly."],
  ["Supply chain attack", "Compromising a trusted third-party product or vendor to reach the real target indirectly."],
];

const MODULES = [
  {
    id: "kali-basics",
    track: "Kali Linux",
    title: "Kali Fundamentals",
    tag: "foundation",
    body: "Kali ships with the standard pentesting toolkit pre-installed. Start with nmap for host/port discovery, then move to service enumeration (smbclient, enum4linux, gobuster for web paths). Every scan you run in a lab should mirror the same recon phase real assessments start with — footprint before you touch anything.",
  },
  {
    id: "kali-exploit",
    track: "Kali Linux",
    title: "Exploitation & Metasploit",
    tag: "offense",
    body: "Metasploit pairs a vulnerability with a payload. Learn the workflow: search for a module matching a known CVE, set RHOSTS/LHOST, choose a payload (meterpreter is standard), and run. Practice against deliberately vulnerable boxes (Metasploitable, HTB starting-point machines) — never anything you don't own or have written permission to test.",
  },
  {
    id: "kali-cracking",
    track: "Kali Linux",
    title: "Password Attacks",
    tag: "offense",
    body: "Hashcat and John the Ripper crack captured hashes offline; Hydra brute-forces live login prompts. Understand hash types (NTLM, bcrypt, MD5) because the wrong mode means zero cracks. On the defense side: this is exactly why salting and slow hash algorithms (bcrypt, Argon2) matter — fast hashes fall in seconds.",
  },
  {
    id: "win-recon",
    track: "Windows — Red Team",
    title: "Recon & Enumeration",
    tag: "offense",
    body: "Before any exploitation: map the domain. Tools like BloodHound visualize Active Directory trust relationships and privilege paths an attacker could walk. Understanding what BloodHound shows an attacker is itself a defensive skill — it's the same map your blue team should be auditing.",
  },
  {
    id: "win-privesc",
    track: "Windows — Red Team",
    title: "Privilege Escalation",
    tag: "offense",
    body: "Common paths: unquoted service paths, weak service permissions, stored credentials, token impersonation (e.g. PrintSpoofer). Each of these is also a hardening checklist item — the attack technique and the audit checklist are the same list, read from opposite ends.",
  },
  {
    id: "win-lateral",
    track: "Windows — Red Team",
    title: "Lateral Movement",
    tag: "offense",
    body: "Pass-the-hash, overpass-the-hash, and WinRM/PsExec let an attacker move between machines using stolen credentials rather than exploits. This is why credential hygiene (unique local admin passwords via LAPS, tiered admin accounts) matters more than most patching schedules.",
  },
  {
    id: "win-detect",
    track: "Windows — Blue Team",
    title: "Detection & Event IDs",
    tag: "defense",
    body: "Key Windows Event IDs to know: 4624/4625 (logon success/failure), 4672 (admin logon), 4688 (process creation), 4720 (account created). Sysmon adds far richer logging — process trees, network connections, registry changes. A SIEM correlates these across the whole domain, turning single events into attack patterns.",
  },
  {
    id: "win-harden",
    track: "Windows — Blue Team",
    title: "Hardening Windows & AD",
    tag: "defense",
    body: "Practical wins: disable NTLM where possible, enforce LAPS for unique local admin passwords, apply the principle of least privilege to AD groups, enable Credential Guard to protect LSASS, and segment admin accounts by tier so a single compromised workstation can't reach domain admin.",
  },
];

const PROJECTS = [
  ["Home AD lab", "Build a small Active Directory domain in VMs (one DC, two clients) and practice the full attack chain end to end, safely."],
  ["Vulnerable box walkthroughs", "Work through HTB or TryHackMe machines and write up your methodology — recon, exploitation, privesc, in your own words."],
  ["Personal recon scanner", "Write a Python script that chains nmap + service enumeration into one report — a real tool you'll actually reuse."],
  ["SIEM in a box", "Stand up Wazuh or the ELK stack on a VM, feed it logs from your lab, and build alerts for the attacks you practice."],
  ["Packet analysis deep-dive", "Capture traffic from a lab attack in Wireshark and document exactly what it looks like on the wire."],
  ["Phishing simulation (lab only)", "Build a fake login page and a mock email in an isolated lab to understand why the technique works."],
  ["Malware analysis sandbox", "Set up an isolated VM to safely detonate and observe sample malware behavior from sites like theZoo."],
  ["CTF write-up blog", "Document every CTF challenge you solve — it becomes a portfolio and cements what you learned."],
  ["IDS from scratch", "Set up Snort or Suricata and write custom rules to catch the specific attacks in your Kali/Windows labs."],
  ["Password policy audit tool", "Script something that checks a list of hashes against common weak-password patterns to demonstrate policy gaps."],
];

const TAG_COLORS = {
  offense: { bg: "#fff4e8", fg: "#b45a12", border: "#f3d9b8" },
  defense: { bg: "#e9f7f3", fg: "#177a63", border: "#bfe6db" },
  foundation: { bg: "#eef1fb", fg: "#3949ab", border: "#cdd4f2" },
};

function useSearch(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { glossary: [], modules: [], projects: [] };
    return {
      glossary: GLOSSARY.filter(
        ([term, def]) => term.toLowerCase().includes(q) || def.toLowerCase().includes(q)
      ),
      modules: MODULES.filter(
        (m) => m.title.toLowerCase().includes(q) || m.body.toLowerCase().includes(q) || m.track.toLowerCase().includes(q)
      ),
      projects: PROJECTS.filter(
        ([title, desc]) => title.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
      ),
    };
  }, [query]);
}

const LAUNCHERS = [
  {
    name: "ChatGPT",
    note: "opens with your question pre-filled",
    url: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
    color: "#10a37f",
  },
  {
    name: "Claude.ai",
    note: "opens fresh — paste your question in",
    url: () => `https://claude.ai/new`,
    color: "#c1662f",
  },
  {
    name: "Google",
    note: "web search",
    url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    color: "#4285f4",
  },
  {
    name: "DuckDuckGo",
    note: "private web search",
    url: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
    color: "#de5833",
  },
  {
    name: "MITRE ATT&CK",
    note: "official attacker technique database",
    url: (q) => `https://attack.mitre.org/search/?q=${encodeURIComponent(q)}`,
    color: "#e8eaf0",
  },
];

function LauncherRow({ query }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 12.5, color: "#9aa3b0", marginBottom: 10, lineHeight: 1.5 }}>
        Not in the local glossary yet — send "<strong>{query}</strong>" to an AI or search engine instead:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {LAUNCHERS.map((l) => (
          <a
            key={l.name}
            href={l.url(query)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "9px 14px",
              borderRadius: 10,
              border: "1px solid #262c38",
              background: "#12161f",
              textDecoration: "none",
              minWidth: 130,
            }}
            className="gw-card"
          >
            <span style={{ fontSize: 13.5, fontWeight: 700, color: l.color }}>{l.name} ↗</span>
            <span style={{ fontSize: 11, color: "#6b7280" }}>{l.note}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TagPill({ tag }) {
  const c = TAG_COLORS[tag] || TAG_COLORS.foundation;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 20,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.border}`,
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      {tag}
    </span>
  );
}

export default function Ghostware() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("modules");
  const results = useSearch(query);
  const searching = query.trim().length > 0;

  const tracks = useMemo(() => {
    const groups = {};
    MODULES.forEach((m) => {
      groups[m.track] = groups[m.track] || [];
      groups[m.track].push(m);
    });
    return groups;
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0d12",
        color: "#e8eaf0",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #6b7280; }
        .gw-card { transition: box-shadow .15s ease, transform .15s ease; }
        .gw-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.35); transform: translateY(-1px); }
      `}</style>

      {/* Hero + search */}
      <div style={{ maxWidth: 700, width: "100%", margin: "0 auto", padding: "14vh 24px 30px", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(34px, 6vw, 58px)",
            fontWeight: 700,
            letterSpacing: -1,
            margin: "0 0 26px",
            color: "#f4f5f8",
          }}
        >
          HACK THE WORLD<span style={{ color: "#39ff88" }}>.</span>
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#12161f",
            border: "1px solid #262c38",
            borderRadius: 12,
            padding: "13px 16px",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <span style={{ color: "#6b7280" }}>
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms, techniques, tools — try 'kerberoasting' or 'nmap'"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 14.5,
              fontFamily: "'Inter', sans-serif",
              color: "#e8eaf0",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ border: "none", background: "none", color: "#6b7280", cursor: "pointer", fontSize: 13 }}
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* Content — only appears while actively searching */}
      <div style={{ maxWidth: 1040, width: "100%", margin: "0 auto", padding: "0 24px 60px" }}>
        {searching && <SearchResults results={results} query={query} />}
      </div>

      <div style={{ borderTop: "1px solid #1c2128", padding: "20px 24px", textAlign: "center", fontSize: 12.5, color: "#9aa3b0", width: "100%" }}>
        For authorized lab use — your own VMs, HTB, TryHackMe. Never systems you don't own or have permission to test.
      </div>
    </div>
  );
}

function ModulesView({ tracks }) {
  return (
    <div>
      {Object.entries(tracks).map(([track, mods]) => (
        <div key={track} style={{ marginBottom: 34 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: "#9aa3b0", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {track}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {mods.map((m) => (
              <div key={m.id} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: "#e8eaf0" }}>{m.title}</h3>
                  <TagPill tag={m.tag} />
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GlossaryView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
      {GLOSSARY.map(([term, def]) => (
        <div key={term} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13.5, color: "#2952e3", marginBottom: 4 }}>
            {term}
          </div>
          <div style={{ fontSize: 13, color: "#9aa3b0", lineHeight: 1.55 }}>{def}</div>
        </div>
      ))}
    </div>
  );
}

function ToolsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
      {TOOLS.map((t) => (
        <div key={t.name} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
            <span style={{ fontSize: 10.5, color: "#6b7280" }}>{t.platform}</span>
          </div>
          <div style={{ fontSize: 11, color: "#2952e3", fontWeight: 600, marginBottom: 6 }}>{t.category}</div>
          <div style={{ fontSize: 13, color: "#9aa3b0", lineHeight: 1.55 }}>{t.desc}</div>
        </div>
      ))}
    </div>
  );
}

function MitreView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {MITRE_TACTICS.map((m, i) => (
        <div key={m.tactic} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, marginBottom: 6 }}>{String(i + 1).padStart(2, "0")}</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 15.5, fontWeight: 700 }}>{m.tactic}</h3>
          <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{m.desc}</p>
          <div style={{ fontSize: 12, color: "#b45a12" }}>e.g. {m.example}</div>
        </div>
      ))}
    </div>
  );
}

function CheatsheetView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {Object.entries(CHEATSHEET).map(([os, cmds]) => (
        <div key={os}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9aa3b0", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
            {os}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cmds.map((c) => (
              <div key={c.cmd} style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 8, padding: "10px 12px" }}>
                <code style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: "#e8eaf0", display: "block", marginBottom: 4, wordBreak: "break-all" }}>
                  {c.cmd}
                </code>
                <div style={{ fontSize: 12, color: "#9aa3b0" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertsView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {CERTIFICATIONS.map((c) => (
        <div key={c.name} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#2952e3", background: "#eef1fb", padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
            {c.stage}
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 3 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: "#9aa3b0", lineHeight: 1.55 }}>{c.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CareersView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {CAREER_PATHS.map((c) => (
        <div key={c.role} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 15.5, fontWeight: 700 }}>{c.role}</h3>
          <p style={{ margin: "0 0 8px", fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{c.desc}</p>
          <div style={{ fontSize: 12, color: "#177a63" }}>Skills: {c.skills}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {PROJECTS.map(([title, desc], i) => (
        <div key={title} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, marginBottom: 6 }}>PROJECT {String(i + 1).padStart(2, "0")}</div>
          <h3 style={{ margin: "0 0 6px", fontSize: 15.5, fontWeight: 700, color: "#e8eaf0" }}>{title}</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}

function SearchResults({ results, query }) {
  const total = results.glossary.length + results.modules.length + results.projects.length;
  if (total === 0) {
    return (
      <div>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}>No local matches for "{query}".</p>
        <LauncherRow query={query} />
      </div>
    );
  }
  return (
    <div>
      <div style={{ marginBottom: 22, paddingBottom: 18, borderBottom: "1px solid #e4e6ec" }}>
        <LauncherRow query={query} />
      </div>
      {results.glossary.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9aa3b0", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
            Glossary — {results.glossary.length}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {results.glossary.map(([term, def]) => (
              <div key={term} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 13.5, color: "#2952e3", marginBottom: 4 }}>{term}</div>
                <div style={{ fontSize: 13, color: "#9aa3b0", lineHeight: 1.55 }}>{def}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {results.modules.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9aa3b0", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
            Learning Tracks — {results.modules.length}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {results.modules.map((m) => (
              <div key={m.id} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700 }}>{m.title}</h3>
                  <TagPill tag={m.tag} />
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {results.projects.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#9aa3b0", textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
            Project Ideas — {results.projects.length}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {results.projects.map(([title, desc]) => (
              <div key={title} className="gw-card" style={{ background: "#12161f", border: "1px solid #262c38", borderRadius: 12, padding: 18 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 15.5, fontWeight: 700 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: "#9aa3b0", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
