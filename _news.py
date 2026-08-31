news_html = '''    <section class="wrap" id="news">
      <div class="section-head">
        <div>
          <div class="kicker">News</div>
          <h2>Latest updates</h2>
          <p>Announcements and changes from the JohnHost team, newest first.</p>
        </div>
      </div>

      <div class="news-list">
        <article class="news-card">
          <div class="news-meta">
            <time datetime="2026-08-30T13:42">August 30, 2026 &middot; 1:42 PM</time>
          </div>
          <h3>Website created</h3>
          <p class="news-body">
            The JohnHost website is officially live. From here you can read the
            rules and terms, check node availability, and apply for a free server
            instance. More pages and features are on the way as the host grows.
          </p>
          <div class="news-signature">
            <span class="news-avatar" aria-hidden="true">J</span>
            <span class="news-author">
              <b>JohnDinglesin</b>
              <span class="news-role">Owner &amp; Founder</span>
            </span>
          </div>
        </article>
      </div>
    </section>
'''

lines = open("index.html", encoding="utf-8").read().split("\n")

# features section spans lines 94-147 (1-indexed) -> indices 93..146
start, end = 93, 147
assert lines[start].strip().startswith('<section class="wrap">'), lines[start]
assert lines[end - 1].strip() == "</section>", lines[end - 1]

new_lines = lines[:start] + news_html.split("\n") + lines[end:]
open("index.html", "w", encoding="utf-8").write("\n".join(new_lines))
print("features section replaced with news feed")
print("new line count:", len(new_lines))