/* ==========================================================================
   Impressum 和 Datenschutzerklärung 的内容
   • 德语是正式版本（de），英语只是说明（en）。
   • 凡是写着 TODO 的地方，需要你自己填写。
   • 只要某个页面里还有 “TODO”，构建脚本就不会发布这个页面，页脚也不会显示它的链接。
   • 可以用 HTML：<h2>小标题</h2>  <p>段落</p>  <ul><li>列表</li></ul>  <br>
   • 不要把住址、电话写进这个仓库以外的地方；填写前请确认你愿意公开这些信息。
   ========================================================================== */

window.LEGAL = {

  impressum: {
    path: "impressum",
    title: { de: "Impressum", en: "Imprint" },
    de: `
      <h2>Angaben gemäß § 5 DDG</h2>
      <p class="todo">TODO: Name und vollständige Anschrift</p>

      <h2>Kontakt</h2>
      <p class="todo">TODO: E-Mail (und ggf. weitere Kontaktmöglichkeit)</p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p class="todo">TODO: Angabe nach § 18 Abs. 2 MStV, falls erforderlich</p>
    `,
    en: `
      <p class="note">This page is the English summary. The German version above is the legally binding one.</p>
      <p class="todo">TODO: Short English note (optional)</p>
    `
  },

  datenschutz: {
    path: "datenschutz",
    title: { de: "Datenschutzerklärung", en: "Privacy policy" },
    de: `
      <h2>1. Verantwortlicher</h2>
      <p class="todo">TODO: Name und Kontaktadresse des Verantwortlichen</p>

      <h2>2. Hosting über GitHub Pages</h2>
      <p>Diese Website wird über GitHub Pages bereitgestellt (GitHub, Inc.). Beim Aufruf der Seiten verarbeitet GitHub technische Zugriffsdaten, insbesondere die IP-Adresse, in Server-Logs.</p>
      <p class="todo">TODO: Rechtsgrundlage, Speicherdauer, Hinweis zur Datenübermittlung in die USA und Link zur Datenschutzerklärung von GitHub</p>

      <h2>3. Keine Cookies, keine Analyse</h2>
      <p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.</p>
      <p>Im lokalen Speicher Ihres Browsers (localStorage) werden nur die gewählte Sprache und das Farbschema (hell/dunkel) gespeichert. Diese Angaben verlassen Ihren Browser nicht.</p>

      <h2>4. Keine externen Inhalte</h2>
      <p>Beim Aufruf werden keine Inhalte von Drittanbietern geladen: keine externen Schriftarten, Skripte oder Einbettungen. Alle Dateien werden von derselben Domain ausgeliefert.</p>
      <p>Die Seite enthält Links zu LinkedIn und Google Maps. Daten werden an diese Anbieter erst übertragen, wenn Sie einen Link anklicken.</p>
      <p class="todo">TODO: Hinweis zu den verlinkten Anbietern (optional)</p>

      <h2>5. Kontakt per E-Mail</h2>
      <p class="todo">TODO: Verarbeitung von E-Mail-Anfragen, Rechtsgrundlage, Speicherdauer</p>

      <h2>6. Ihre Rechte</h2>
      <p class="todo">TODO: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerderecht bei einer Aufsichtsbehörde</p>
    `,
    en: `
      <p class="note">This is an English summary. The German version above is the legally binding one.</p>
      <ul>
        <li>Hosted on GitHub Pages; GitHub processes access data such as IP addresses in server logs.</li>
        <li>No cookies, no analytics or tracking.</li>
        <li>Only your language and light/dark choice are stored in your browser (localStorage).</li>
        <li>No external fonts, scripts or embeds. LinkedIn and Google Maps are plain links.</li>
      </ul>
      <p class="todo">TODO: Review this summary once the German text is final</p>
    `
  }
};
