import { useState } from "react";

const sections = [
  {
    id: "intro",
    icon: "⚡",
    title: "ما هو Claude Code؟",
    color: "#E8D5B7",
    content: [
      {
        type: "text",
        body: "أداة برمجة من Anthropic تعمل مباشرةً في الـ Terminal. تقرأ كامل قاعدة الكود، تعدّل الملفات، تنفّذ الأوامر، وتدير Git — كل ذلك بأوامر نصية طبيعية."
      },
      {
        type: "tags",
        items: ["يفهم السياق الكامل للمشروع", "يعدّل ملفات متعددة", "يدير Git", "يتصل بأدوات خارجية عبر MCP"]
      }
    ]
  },
  {
    id: "install",
    icon: "📦",
    title: "التثبيت",
    color: "#B7D4E8",
    content: [
      {
        type: "subtitle",
        body: "الاشتراك المطلوب"
      },
      {
        type: "tags",
        items: ["Pro — $20/شهر", "Max — $100/شهر", "Max 20x — $200/شهر", "❌ الخطة المجانية لا تشمل Claude Code"]
      },
      {
        type: "subtitle",
        body: "macOS / Linux"
      },
      {
        type: "code",
        body: "curl -fsSL https://claude.ai/install.sh | sh"
      },
      {
        type: "subtitle",
        body: "Windows (PowerShell)"
      },
      {
        type: "code",
        body: "irm https://claude.ai/install.ps1 | iex"
      },
      {
        type: "subtitle",
        body: "بعد التثبيت"
      },
      {
        type: "code",
        body: "cd your-project\nclaude"
      },
      {
        type: "note",
        body: "المثبت الأصلي لا يحتاج Node.js ويُحدَّث تلقائياً في الخلفية"
      }
    ]
  },
  {
    id: "models",
    icon: "🧠",
    title: "النماذج",
    color: "#D4B7E8",
    content: [
      {
        type: "table",
        rows: [
          ["النموذج", "متى تستخدمه"],
          ["Sonnet 4.6", "80% من العمل اليومي — كتابة دوال، إصلاح أخطاء، اختبارات"],
          ["Opus 4.6", "20% الأصعب — معمارية كبيرة، ملفات كثيرة، قرارات معقدة"],
        ]
      },
      {
        type: "code",
        body: "/model sonnet   ← سريع وأرخص\n/model opus     ← تفكير أعمق"
      }
    ]
  },
  {
    id: "claudemd",
    icon: "📄",
    title: "ملف CLAUDE.md",
    color: "#B7E8C8",
    content: [
      {
        type: "text",
        body: "أهم ملف في مشروعك — Claude يقرأه تلقائياً في بداية كل جلسة. يحتوي على سياق المشروع وتفضيلاتك."
      },
      {
        type: "subtitle",
        body: "لإنشائه تلقائياً"
      },
      {
        type: "code",
        body: "/init"
      },
      {
        type: "subtitle",
        body: "مثال على محتواه"
      },
      {
        type: "code",
        body: "## Commands\n- npm run dev    → تشغيل السيرفر\n- npm test       → تشغيل الاختبارات\n- npm run build  → بناء للإنتاج\n\n## Architecture\n- Next.js + TypeScript\n- PostgreSQL + Prisma\n\n## Conventions\n- TypeScript strict mode\n- Server components by default\n- Commit messages: imperative mood"
      },
      {
        type: "note",
        body: "ابقِ CLAUDE.md أقل من 200 سطر — يُحمَّل في كل رسالة"
      }
    ]
  },
  {
    id: "commands",
    icon: "⌨️",
    title: "أوامر Slash الأساسية",
    color: "#E8E0B7",
    content: [
      {
        type: "table",
        rows: [
          ["الأمر", "الوظيفة"],
          ["/help", "عرض كل الأوامر المتاحة"],
          ["/init", "إنشاء CLAUDE.md تلقائياً"],
          ["/clear", "مسح السياق والبدء من جديد"],
          ["/compact", "ضغط السياق عند امتلائه (فوق 80%)"],
          ["/model", "تغيير النموذج المستخدم"],
          ["/memory", "إدارة ملف CLAUDE.md"],
          ["/plan", "وضع التخطيط قبل التنفيذ"],
          ["/mcp", "إدارة اتصالات MCP"],
          ["/doctor", "تشخيص المشاكل والإعدادات"],
          ["/status", "عرض حالة النموذج والجلسة"],
        ]
      }
    ]
  },
  {
    id: "shortcuts",
    icon: "🎹",
    title: "اختصارات لوحة المفاتيح",
    color: "#E8B7C8",
    content: [
      {
        type: "table",
        rows: [
          ["الاختصار", "الوظيفة"],
          ["Shift + Tab", "التنقل بين: عادي ← قبول تلقائي ← وضع التخطيط"],
          ["Ctrl + O", "تفعيل الإخراج التفصيلي (verbose)"],
          ["Ctrl + C", "إيقاف المهمة الحالية"],
          ["Ctrl + F مرتين", "إيقاف كل الـ agents الخلفية"],
        ]
      },
      {
        type: "subtitle",
        body: "بادئات خاصة في الأوامر"
      },
      {
        type: "table",
        rows: [
          ["البادئة", "الاستخدام"],
          ["@filename", "إضافة ملف/مجلد مباشرة للسياق"],
          ["!command", "تنفيذ أمر shell وإضافة نتيجته للمحادثة"],
        ]
      }
    ]
  },
  {
    id: "planmode",
    icon: "🗺️",
    title: "وضع التخطيط (Plan Mode)",
    color: "#B7E8E0",
    content: [
      {
        type: "text",
        body: "يجعل Claude يُخطط أولاً قبل أن يغيّر أي ملف — استخدمه لأي مهمة تمس أكثر من ملفين."
      },
      {
        type: "code",
        body: "/plan\nأعد هيكلة نظام المصادقة ليستخدم JWT بدلاً من sessions"
      },
      {
        type: "tags",
        items: ["تراجع الخطة", "اسأل أسئلة", "عدّل قبل الموافقة", "ثم نفّذ"]
      }
    ]
  },
  {
    id: "mcp",
    icon: "🔌",
    title: "MCP — ربط الأدوات الخارجية",
    color: "#C8B7E8",
    content: [
      {
        type: "text",
        body: "بدون MCP، Claude يقرأ الملفات فقط. مع MCP، يستطيع الاستعلام من قاعدة البيانات، إنشاء تذاكر Jira، مراجعة PRs على GitHub، وأكثر."
      },
      {
        type: "subtitle",
        body: "ربط سيرفر MCP"
      },
      {
        type: "code",
        body: "# HTTP server\nclaude mcp add --transport http my-server https://...\n\n# محلي\nclaude mcp add my-server -- command args\n\n# عرض المتصلين\nclaude mcp list"
      },
      {
        type: "subtitle",
        body: "أوامر MCP داخل الجلسة"
      },
      {
        type: "code",
        body: "/mcp__github__list_prs\n/mcp__github__create_pr\n/mcp__[server]__[command]"
      }
    ]
  },
  {
    id: "customcmds",
    icon: "🛠️",
    title: "أوامر مخصصة (Skills)",
    color: "#E8D0B7",
    content: [
      {
        type: "text",
        body: "أنشئ أوامر slash خاصة بك كملفات SKILL.md"
      },
      {
        type: "table",
        rows: [
          ["المسار", "النطاق"],
          [".claude/skills/", "للمشروع الحالي (يُشارك مع الفريق)"],
          ["~/.claude/skills/", "شخصي لكل المشاريع"],
        ]
      },
      {
        type: "subtitle",
        body: "مثال: أمر /security-review"
      },
      {
        type: "code",
        body: "--- \nname: security-review\ndescription: مراجعة الكود للثغرات الأمنية\n---\nافحص هذا الكود للثغرات الأمنية وقدّم تقريراً."
      },
      {
        type: "code",
        body: "# الاستخدام داخل Claude Code\n/security-review"
      }
    ]
  },
  {
    id: "tips",
    icon: "💡",
    title: "نصائح الاستخدام الفعّال",
    color: "#B7C8E8",
    content: [
      {
        type: "list",
        items: [
          "ابدأ كل مشروع بـ /init لإنشاء CLAUDE.md",
          "استخدم /plan لأي تغيير يمس أكثر من ملفين",
          "استخدم /compact عندما يتجاوز السياق 80%",
          "استخدم @file لإضافة ملفات مهمة للسياق مباشرة",
          "اكتب في CLAUDE.md: أوامر التشغيل، المعمارية، معايير الكود",
          "استخدم /clear عند التبديل بين مهام مختلفة تماماً",
          "فعّل Fast Mode للتكرار السريع، وأوقفه لتوفير التكلفة",
          "استخدم Sonnet للمهام اليومية وحوّل لـ Opus عند الحاجة فقط"
        ]
      }
    ]
  }
];

const tagColors = ["#2D2D2D", "#1A3A4A", "#2A1A4A", "#1A4A2A", "#4A3A1A"];

export default function ClaudeCodeRef() {
  const [active, setActive] = useState("intro");

  const section = sections.find(s => s.id === active);

  const renderContent = (item, i) => {
    switch (item.type) {
      case "text":
        return (
          <p key={i} style={{ color: "#1a1a1a", lineHeight: "1.7", marginBottom: "12px", fontSize: "14px" }}>
            {item.body}
          </p>
        );
      case "subtitle":
        return (
          <p key={i} style={{ fontWeight: "700", color: "#111", marginTop: "14px", marginBottom: "6px", fontSize: "13px", letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {item.body}
          </p>
        );
      case "code":
        return (
          <pre key={i} style={{
            background: "#1a1a2e",
            color: "#a8d8ea",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "12px",
            overflowX: "auto",
            marginBottom: "12px",
            fontFamily: "'Courier New', monospace",
            lineHeight: "1.6",
            border: "1px solid #2a2a4a"
          }}>
            {item.body}
          </pre>
        );
      case "note":
        return (
          <div key={i} style={{
            background: "#fffbe6",
            border: "1px solid #f0d060",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "12px",
            color: "#5a4a00",
            marginBottom: "12px"
          }}>
            ℹ️ {item.body}
          </div>
        );
      case "tags":
        return (
          <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {item.items.map((tag, j) => (
              <span key={j} style={{
                background: tagColors[j % tagColors.length],
                color: "#fff",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: "500"
              }}>
                {tag}
              </span>
            ))}
          </div>
        );
      case "table":
        return (
          <div key={i} style={{ overflowX: "auto", marginBottom: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <tbody>
                {item.rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri === 0 ? "#1a1a2e" : ri % 2 === 0 ? "#f8f8f8" : "#fff" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        padding: "7px 12px",
                        border: "1px solid #e0e0e0",
                        color: ri === 0 ? "#a8d8ea" : "#1a1a1a",
                        fontWeight: ri === 0 ? "700" : ci === 0 ? "600" : "400",
                        fontFamily: ri === 0 ? "inherit" : ci === 0 ? "'Courier New', monospace" : "inherit",
                        fontSize: ri === 0 ? "11px" : "12px"
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "list":
        return (
          <ul key={i} style={{ paddingLeft: "0", margin: "0 0 12px 0", listStyle: "none" }}>
            {item.items.map((li, j) => (
              <li key={j} style={{
                padding: "6px 0",
                borderBottom: "1px solid #eee",
                fontSize: "13px",
                color: "#1a1a1a",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px"
              }}>
                <span style={{ color: "#2D8A6E", fontWeight: "700", flexShrink: 0 }}>✓</span>
                {li}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      background: "#f0ece4",
      direction: "rtl"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "24px 20px 20px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "28px", marginBottom: "4px" }}>⚡</div>
        <h1 style={{
          color: "#a8d8ea",
          margin: "0 0 4px",
          fontSize: "22px",
          fontWeight: "800",
          letterSpacing: "-0.5px"
        }}>
          Claude Code
        </h1>
        <p style={{ color: "#8899aa", margin: "0", fontSize: "12px" }}>
          مرجع شامل · 2026
        </p>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: "6px",
        padding: "12px",
        background: "#fff",
        borderBottom: "2px solid #e0dcd4",
        scrollbarWidth: "none"
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: "20px",
              border: active === s.id ? "2px solid #1a1a2e" : "2px solid transparent",
              background: active === s.id ? "#1a1a2e" : s.color,
              color: active === s.id ? "#fff" : "#1a1a1a",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "16px", maxWidth: "680px", margin: "0 auto" }}>
        <div style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderTop: `4px solid ${section.color}`
        }}>
          <h2 style={{
            margin: "0 0 16px",
            fontSize: "18px",
            fontWeight: "800",
            color: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <span style={{
              background: section.color,
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "16px"
            }}>
              {section.icon}
            </span>
            {section.title}
          </h2>
          {section.content.map((item, i) => renderContent(item, i))}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "#999",
          fontSize: "11px",
          marginTop: "16px",
          paddingBottom: "20px"
        }}>
          docs: code.claude.com/docs
        </p>
      </div>
    </div>
  );
}
