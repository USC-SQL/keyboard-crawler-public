#!/usr/bin/env python3

from pathlib import Path
import re

SRC_ROOT = Path("src/main/java").resolve()
ROOT_FILE = SRC_ROOT / "edu/usc/sql/krawler/RunApproachKrawler.java"
BASE_PACKAGE = "edu.usc.sql.krawler"

IMPORT_RE = re.compile(r"^\s*import\s+(?:static\s+)?([a-zA-Z_][\w]*(?:\.[a-zA-Z_][\w]*)+)(?:\.\*)?\s*;", re.MULTILINE)
PACKAGE_RE = re.compile(r"^\s*package\s+([a-zA-Z_][\w]*(?:\.[a-zA-Z_][\w]*)*)\s*;", re.MULTILINE)
CLASS_RE = re.compile(r"\b(?:class|interface|enum)\s+([A-Za-z_][A-Za-z0-9_]*)\b")

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")

def fqcn_to_path(fqcn: str) -> Path:
    return SRC_ROOT / (fqcn.replace(".", "/") + ".java")

def path_to_fqcn(path: Path) -> str:
    rel = path.resolve().relative_to(SRC_ROOT)
    return ".".join(rel.with_suffix("").parts)

def package_of(text: str) -> str | None:
    m = PACKAGE_RE.search(text)
    return m.group(1) if m else None

def declared_names(text: str) -> set[str]:
    return set(CLASS_RE.findall(text))

all_java = sorted(SRC_ROOT.rglob("*.java"))
all_project_files = {
    path_to_fqcn(p): p
    for p in all_java
    if path_to_fqcn(p).startswith(BASE_PACKAGE)
}

# Index simple class names. This helps catch same-package references without explicit imports.
simple_to_fqcns = {}
for fqcn, path in all_project_files.items():
    simple = fqcn.split(".")[-1]
    simple_to_fqcns.setdefault(simple, set()).add(fqcn)

keep = set()
edges = {}
stack = [path_to_fqcn(ROOT_FILE)]

while stack:
    fqcn = stack.pop()
    if fqcn in keep:
        continue

    path = all_project_files.get(fqcn)
    if path is None or not path.exists():
        continue

    keep.add(fqcn)
    text = read_text(path)
    pkg = package_of(text)

    deps = set()

    # Explicit imports.
    for imported in IMPORT_RE.findall(text):
        if imported.startswith(BASE_PACKAGE):
            if imported in all_project_files:
                deps.add(imported)

    # Same-package simple-name references.
    # This catches files used without import because they are in the same package.
    if pkg:
        for simple, candidates in simple_to_fqcns.items():
            if re.search(r"\b" + re.escape(simple) + r"\b", text):
                same_pkg_fqcn = pkg + "." + simple
                if same_pkg_fqcn in all_project_files and same_pkg_fqcn != fqcn:
                    deps.add(same_pkg_fqcn)

    edges[fqcn] = deps

    for dep in deps:
        if dep not in keep:
            stack.append(dep)

all_fqcns = set(all_project_files.keys())
unused = sorted(all_fqcns - keep)
keep_sorted = sorted(keep)

Path("target").mkdir(exist_ok=True)

with open("target/krawler-keep-files.txt", "w") as f:
    for fqcn in keep_sorted:
        f.write(str(all_project_files[fqcn].relative_to(Path.cwd())) + "\n")

with open("target/krawler-delete-candidates.txt", "w") as f:
    for fqcn in unused:
        f.write(str(all_project_files[fqcn].relative_to(Path.cwd())) + "\n")

with open("target/krawler-dependency-edges.txt", "w") as f:
    for src in sorted(edges):
        for dst in sorted(edges[src]):
            f.write(f"{src} -> {dst}\n")

print(f"Root: {ROOT_FILE.relative_to(Path.cwd())}")
print(f"Total project Java files: {len(all_fqcns)}")
print(f"Reachable keep files: {len(keep_sorted)}")
print(f"Delete candidates: {len(unused)}")
print()
print("Wrote:")
print("  target/krawler-keep-files.txt")
print("  target/krawler-delete-candidates.txt")
print("  target/krawler-dependency-edges.txt")
