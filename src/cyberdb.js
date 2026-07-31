/* =====================================================================
   GHOSTWARE KNOWLEDGE DATABASE
   ---------------------------------------------------------------------
   This is YOUR editable database. No API, no build step needed to
   update it — just add entries to the arrays below and redeploy.

   Structure:
   - GLOSSARY        : term + definition + category
   - TOOLS           : name, category, what it does, platform
   - CERTIFICATIONS  : roadmap entries in suggested order
   - MITRE_TACTICS   : ATT&CK tactics with linked techniques
   - CHEATSHEET      : quick command references by OS
   - CAREER_PATHS    : role descriptions + skills needed

   HOW TO ADD AN ENTRY:
   Just copy the pattern of the line above/below it and edit the text.
   Each entry is just an array — order doesn't matter, categories do.
===================================================================== */

export const GLOSSARY = [
  // --- Core concepts ---
  { term: "CIA Triad", category: "Core Concepts", def: "The three goals of security: Confidentiality, Integrity, Availability. Every control maps back to one of these." },
  { term: "Zero Trust", category: "Core Concepts", def: "A security model that assumes no user or device is trusted by default, even inside the network — every request is verified." },
  { term: "Attack Surface", category: "Core Concepts", def: "The total set of points where an attacker could try to get into a system." },
  { term: "Threat Actor", category: "Core Concepts", def: "An individual or group responsible for carrying out an attack." },
  { term: "APT", category: "Core Concepts", def: "Advanced Persistent Threat — a sophisticated, often state-backed attacker focused on long-term access." },
  { term: "Kill Chain", category: "Core Concepts", def: "A model breaking an attack into stages, from recon through to final objective, used to plan defenses at each stage." },
  { term: "IOC", category: "Core Concepts", def: "Indicator of Compromise — evidence (a hash, IP, file, etc.) that a system has been breached." },
  { term: "TTP", category: "Core Concepts", def: "Tactics, Techniques, and Procedures — the behavioral patterns that describe how an attacker operates." },
  { term: "Zero-day", category: "Core Concepts", def: "A vulnerability unknown to the vendor, with no patch available yet." },
  { term: "CVE", category: "Core Concepts", def: "Common Vulnerabilities and Exposures — a standardized ID for a publicly known vulnerability." },
  { term: "CVSS", category: "Core Concepts", def: "Common Vulnerability Scoring System — a numeric severity score for a vulnerability." },

  // --- Red team / offense ---
  { term: "Reconnaissance", category: "Red Team", def: "The information-gathering phase before an attack begins." },
  { term: "Enumeration", category: "Red Team", def: "Actively probing a target to extract detailed information like usernames, shares, or services." },
  { term: "Kerberoasting", category: "Red Team", def: "Requesting service tickets for Windows accounts with an SPN, then cracking the ticket offline to recover the account password." },
  { term: "Pass-the-hash", category: "Red Team", def: "Authenticating using a stolen password hash directly, without ever knowing the plaintext password." },
  { term: "Golden Ticket", category: "Red Team", def: "A forged Kerberos ticket giving unlimited access to an Active Directory domain." },
  { term: "Silver Ticket", category: "Red Team", def: "A forged Kerberos service ticket for a specific service, requiring only that service's hash rather than the domain's." },
  { term: "Lateral Movement", category: "Red Team", def: "Moving from one compromised machine to others inside the same network." },
  { term: "Privilege Escalation", category: "Red Team", def: "Turning limited access into higher-level access — user to admin, or admin to SYSTEM." },
  { term: "Persistence", category: "Red Team", def: "Techniques that let an attacker keep access even after a reboot or password change." },
  { term: "Living off the Land", category: "Red Team", def: "Using legitimate, built-in system tools to carry out an attack to avoid detection by traditional malware scanners." },
  { term: "Pivoting", category: "Red Team", def: "Using a compromised machine as a launch point to reach otherwise unreachable parts of a network." },
  { term: "Exfiltration", category: "Red Team", def: "The unauthorized transfer of data out of a target network." },
  { term: "Payload", category: "Red Team", def: "The part of an attack that does the actual damage or action — e.g. a reverse shell dropped after an exploit runs." },
  { term: "C2 (Command & Control)", category: "Red Team", def: "Infrastructure an attacker uses to send instructions to and receive data from compromised machines." },
  { term: "Exploit", category: "Red Team", def: "Code or a technique that takes advantage of a specific vulnerability." },
  { term: "Buffer Overflow", category: "Red Team", def: "Writing more data to memory than it can hold, potentially letting an attacker execute arbitrary code." },
  { term: "SQL Injection", category: "Red Team", def: "Inserting malicious SQL through user input to manipulate or extract data from a database." },
  { term: "XSS", category: "Red Team", def: "Cross-Site Scripting — injecting malicious scripts into a web page that run in another user's browser." },
  { term: "CSRF", category: "Red Team", def: "Cross-Site Request Forgery — tricking a logged-in user's browser into performing an unwanted action on a site." },
  { term: "Social Engineering", category: "Red Team", def: "Manipulating people, rather than systems, into breaking security procedures." },
  { term: "Phishing", category: "Red Team", def: "Tricking someone into giving up credentials or running malware, usually via a fake email or site." },
  { term: "Watering Hole Attack", category: "Red Team", def: "Compromising a website the target is known to visit, rather than attacking them directly." },
  { term: "Supply Chain Attack", category: "Red Team", def: "Compromising a trusted third-party product or vendor to reach the real target indirectly." },

  // --- Blue team / defense ---
  { term: "SIEM", category: "Blue Team", def: "Security Information and Event Management — aggregates and correlates logs from across an environment to spot threats." },
  { term: "EDR", category: "Blue Team", def: "Endpoint Detection and Response — software that monitors individual devices for malicious behavior in real time." },
  { term: "IDS / IPS", category: "Blue Team", def: "Intrusion Detection/Prevention System — monitors traffic for malicious patterns; IPS can actively block them." },
  { term: "Sysmon", category: "Blue Team", def: "A free Microsoft tool that logs detailed system activity on Windows, widely used for threat detection." },
  { term: "Threat Hunting", category: "Blue Team", def: "Proactively searching a network for signs of compromise, rather than waiting for an alert." },
  { term: "Honeypot", category: "Blue Team", def: "A decoy system designed to attract attackers so defenders can study or detect them." },
  { term: "Sandbox", category: "Blue Team", def: "An isolated environment used to safely run and observe suspicious code." },
  { term: "Purple Team", category: "Blue Team", def: "A collaborative exercise where red and blue teams work together to improve detection and response." },
  { term: "Firewall", category: "Blue Team", def: "A system that filters network traffic based on rules, blocking or allowing connections." },
  { term: "LAPS", category: "Blue Team", def: "Local Administrator Password Solution — a Microsoft tool that randomizes and rotates local admin passwords across a domain." },
  { term: "Credential Guard", category: "Blue Team", def: "A Windows security feature that isolates and protects credentials stored in LSASS memory." },

  // --- Cryptography ---
  { term: "Encryption", category: "Cryptography", def: "Converting data into unreadable form, reversible only with the correct key." },
  { term: "Hashing", category: "Cryptography", def: "A one-way function converting data into a fixed-length string, used to verify integrity or store passwords." },
  { term: "Salting", category: "Cryptography", def: "Adding random data to a password before hashing, to defeat precomputed cracking tables." },
  { term: "Two-Factor Authentication", category: "Cryptography", def: "Requiring a second proof of identity beyond a password — a code, key, or biometric." },

  // --- Networking / infra ---
  { term: "Active Directory", category: "Networking", def: "Microsoft's directory service for managing users, computers, and permissions across a Windows network." },
  { term: "Kerberos", category: "Networking", def: "The default authentication protocol in Active Directory, using tickets instead of passwords on the wire." },
  { term: "NTLM", category: "Networking", def: "An older Windows authentication protocol, still widely present and a common attack target." },
  { term: "LSASS", category: "Networking", def: "A Windows process that handles authentication and stores credentials in memory — a prime target for credential theft." },
  { term: "VPN", category: "Networking", def: "Encrypts and tunnels network traffic, hiding it from the local network and masking origin." },
  { term: "Air Gap", category: "Networking", def: "Physically isolating a system from any network, including the internet." },
  { term: "Man-in-the-Middle", category: "Networking", def: "Intercepting communication between two parties without either realizing it." },

  // --- Malware ---
  { term: "Ransomware", category: "Malware", def: "Malware that encrypts a victim's files and demands payment for the decryption key." },
  { term: "Rootkit", category: "Malware", def: "Malware designed to hide its own presence and maintain privileged access on a system." },
  { term: "Botnet", category: "Malware", def: "A network of compromised machines controlled remotely, often used for DDoS or spam." },
  { term: "DDoS", category: "Malware", def: "Distributed Denial of Service — overwhelming a system with traffic from many sources to take it offline." },
];

export const TOOLS = [
  { name: "Nmap", category: "Recon", platform: "Kali/Linux", desc: "Network scanning tool for host and port discovery." },
  { name: "Wireshark", category: "Recon", platform: "Cross-platform", desc: "Packet capture and inspection tool for deep traffic analysis." },
  { name: "BloodHound", category: "Recon", platform: "Kali/Windows", desc: "Maps Active Directory trust relationships and privilege escalation paths visually." },
  { name: "Metasploit", category: "Exploitation", platform: "Kali/Linux", desc: "Framework for developing and running exploits against known vulnerabilities." },
  { name: "Burp Suite", category: "Web", platform: "Cross-platform", desc: "Intercepting proxy and toolkit for web application testing." },
  { name: "SQLmap", category: "Web", platform: "Kali/Linux", desc: "Automated SQL injection detection and exploitation." },
  { name: "Gobuster", category: "Web", platform: "Kali/Linux", desc: "Directory/file brute-forcing tool for discovering hidden web paths." },
  { name: "John the Ripper", category: "Credentials", platform: "Cross-platform", desc: "Password-cracking tool supporting many hash formats." },
  { name: "Hashcat", category: "Credentials", platform: "Cross-platform", desc: "Fast, GPU-accelerated password-cracking tool." },
  { name: "Hydra", category: "Credentials", platform: "Kali/Linux", desc: "Brute-forces login credentials across many protocols." },
  { name: "Mimikatz", category: "Credentials", platform: "Windows", desc: "Extracts credentials, tickets, and hashes from Windows memory." },
  { name: "Sysmon", category: "Defense", platform: "Windows", desc: "Microsoft's detailed system activity logger, key for detection engineering." },
  { name: "Wazuh", category: "Defense", platform: "Cross-platform", desc: "Free, open-source SIEM/XDR platform for log correlation and alerting." },
  { name: "Snort / Suricata", category: "Defense", platform: "Linux", desc: "Open-source intrusion detection/prevention engines." },
  { name: "Volatility", category: "Forensics", platform: "Cross-platform", desc: "Memory forensics framework for analyzing RAM dumps." },
  { name: "Autopsy", category: "Forensics", platform: "Cross-platform", desc: "Digital forensics platform for disk image analysis." },
];

export const CERTIFICATIONS = [
  { name: "CompTIA Security+", stage: "Foundation", desc: "Entry-level, vendor-neutral cert covering core security concepts. Usually the first cert people pursue." },
  { name: "CompTIA Network+", stage: "Foundation", desc: "Networking fundamentals — useful before or alongside Security+ since so much of security assumes networking knowledge." },
  { name: "eJPT", stage: "Early Practical", desc: "Hands-on, affordable entry-level pentesting cert focused on practical skills over theory." },
  { name: "PNPT (Practical Network Penetration Tester)", stage: "Intermediate", desc: "Fully practical exam simulating a real pentest engagement end to end, including a written report." },
  { name: "OSCP", stage: "Intermediate/Advanced", desc: "The industry-respected practical pentesting cert — a 24-hour hands-on exam. Widely seen as a strong signal to employers." },
  { name: "CEH", stage: "Intermediate", desc: "Broad, vendor-run cert covering ethical hacking concepts; more theory-heavy than OSCP but still widely recognized." },
  { name: "GCIH / GCFA (SANS/GIAC)", stage: "Advanced", desc: "Incident handling and forensics certs, respected but expensive — often employer-sponsored." },
  { name: "OSCE / OSEP", stage: "Advanced", desc: "Advanced offensive certs from Offensive Security, building on OSCP for evasion and advanced exploitation." },
];

export const MITRE_TACTICS = [
  { tactic: "Reconnaissance", desc: "Gathering information to plan future operations.", example: "OSINT, scanning, phishing recon." },
  { tactic: "Initial Access", desc: "Getting an initial foothold in a network.", example: "Phishing, exploiting public-facing apps." },
  { tactic: "Execution", desc: "Running attacker-controlled code on a target system.", example: "PowerShell, scripting, scheduled tasks." },
  { tactic: "Persistence", desc: "Maintaining access across restarts or credential changes.", example: "Registry run keys, scheduled tasks." },
  { tactic: "Privilege Escalation", desc: "Gaining higher-level permissions.", example: "Token impersonation, unquoted service paths." },
  { tactic: "Defense Evasion", desc: "Avoiding detection.", example: "Disabling logging, obfuscation, living off the land." },
  { tactic: "Credential Access", desc: "Stealing account names and passwords.", example: "LSASS dumping, Kerberoasting." },
  { tactic: "Discovery", desc: "Learning about the environment.", example: "BloodHound, network/service enumeration." },
  { tactic: "Lateral Movement", desc: "Moving through the environment.", example: "Pass-the-hash, PsExec, WinRM." },
  { tactic: "Collection", desc: "Gathering data of interest before exfiltration.", example: "Screen capture, keylogging, file staging." },
  { tactic: "Exfiltration", desc: "Stealing data out of the network.", example: "Encrypted C2 channels, cloud storage uploads." },
  { tactic: "Impact", desc: "Disrupting, destroying, or manipulating systems/data.", example: "Ransomware, data wiping, DoS." },
];

export const CHEATSHEET = {
  linux: [
    { cmd: "nmap -sC -sV -oN scan.txt <ip>", desc: "Default scripts + version detection, save output." },
    { cmd: "gobuster dir -u <url> -w wordlist.txt", desc: "Brute-force web directories." },
    { cmd: "sudo tcpdump -i eth0 -w cap.pcap", desc: "Capture traffic on an interface to a file." },
    { cmd: "hydra -l user -P wordlist.txt ssh://<ip>", desc: "Brute-force SSH login." },
    { cmd: "hashcat -m 1000 hashes.txt wordlist.txt", desc: "Crack NTLM hashes with a wordlist." },
  ],
  windows: [
    { cmd: "whoami /priv", desc: "List current user's privileges — key first privesc check." },
    { cmd: "net user /domain", desc: "List domain users." },
    { cmd: "Get-WinEvent -LogName Security -MaxEvents 50", desc: "PowerShell: pull recent security event log entries." },
    { cmd: "reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", desc: "Check common persistence location." },
    { cmd: "wmic service get name,pathname,startmode", desc: "List services and their executable paths — check for unquoted paths." },
  ],
};

export const CAREER_PATHS = [
  { role: "SOC Analyst", desc: "Front-line monitoring and triage of security alerts. Common entry point into the field.", skills: "SIEM tools, log analysis, basic networking, Security+" },
  { role: "Penetration Tester", desc: "Authorized simulated attacks against client systems to find exploitable weaknesses.", skills: "OSCP/PNPT, scripting, deep protocol knowledge" },
  { role: "Red Teamer", desc: "Long-form, stealthy adversary simulation testing detection and response, not just vulnerabilities.", skills: "Advanced evasion, C2 frameworks, AD attack paths" },
  { role: "Incident Responder", desc: "Investigates and contains active breaches, coordinates recovery.", skills: "Forensics, malware analysis, GCIH-style certs" },
  { role: "Threat Intelligence Analyst", desc: "Tracks threat actor behavior and campaigns to inform defenses proactively.", skills: "OSINT, TTP mapping, report writing" },
  { role: "Detection Engineer", desc: "Builds and tunes the rules/alerts that a SOC actually relies on.", skills: "Sysmon, SIEM query languages, MITRE ATT&CK fluency" },
];
