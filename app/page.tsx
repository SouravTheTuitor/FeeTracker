import Link from "next/link";

export default function Home() {
  const pages = [
    {title: "Dashboard", icon:"🏠", href:"/dashboard"},
    {title: "Students", icon:"🧑‍🎓", href:"/students"},
    {title: "Fees", icon:"💰", href:"/fees"},
    {title: "Reports", icon:"📊", href:"/reports"},
    {title: "Notes", icon:"📝", href:"/notes"},
    {title: "Settings", icon:"⚙️", href:"/settings"},
  ];

  return(
    <main className="min-h-screen bg-slate-950 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾Tuition</h1>

      <div className="grid grid-cols-2 gap-4">
        {pages.map((item)=>(
          <Link
              key={item.title}
              href={item.href}
              className="bg-slate-800 rounded-2xl p-6 text-center hover:bg-slate-700 transition"
              >
                <div className="text-4xl mb-2">
                {item.icon}
                </div>
                <p className="font-medium">
                  {item.title}
                </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
