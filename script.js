(() => {
  // typewriter
  const lines = [
    "$ ./skills --top",
    "  > AI-enabled vuln research, web exploitation, RAG pipelines",
    "$ ./current --status",
    "  > one semester left at GMU. capstone shipped, building what's next.",
    "$ echo \"open to summer + new grad roles\" | mail recruiters",
    "  > delivered.",
  ];
  const target = document.getElementById("typed");
  if (target) {
    let li = 0, ci = 0;
    const tick = () => {
      if (li >= lines.length) {
        target.textContent = lines.join("\n");
        return;
      }
      const cur = lines.slice(0, li).join("\n") + (li ? "\n" : "") + lines[li].slice(0, ci);
      target.textContent = cur;
      ci++;
      if (ci > lines[li].length) {
        li++;
        ci = 0;
        setTimeout(tick, 280);
      } else {
        setTimeout(tick, 18 + Math.random() * 22);
      }
    };
    setTimeout(tick, 400);
  }

  // blog teasers on the homepage
  const list = document.getElementById("post-list");
  if (list) {
    fetch("posts/index.json?v=" + Date.now())
      .then(r => r.json())
      .then(posts => {
        const top = posts.slice(0, 3);
        list.innerHTML = top.map(p => `
          <article class="card">
            <div class="tag-row">
              <span class="tag cyan">post</span>
              ${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}
            </div>
            <h3><a href="posts/${p.slug}.html">${p.title}</a></h3>
            <p class="desc">${p.excerpt}</p>
            <div class="meta"><span>${p.date}</span><span>${p.read || "3 min"}</span></div>
          </article>
        `).join("");
      })
      .catch(() => {
        list.innerHTML = `<p class="dim">posts loading... check back in a sec.</p>`;
      });
  }

  // last-updated freshness label
  const lu = document.getElementById("last-updated");
  if (lu) {
    const d = new Date(lu.textContent);
    if (!isNaN(d)) {
      const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      const fresh = days <= 7 ? "[ fresh ]" : days <= 30 ? "[ recent ]" : "[ stale ]";
      lu.insertAdjacentHTML("afterend", ` <span class="dim">${fresh}</span>`);
    }
  }
})();
