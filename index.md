---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
layout: default
title: 🇳🇴 Hjem
---

## 🎉 Hurra for 17. mai! 🇳🇴
Velkommen til en superkoselig nasjonaldagsfeiring på Kleppestø barneskole for både små og store! 🥳🎈

Her på siden finner du:<br>
- 📋 Programmet
- 🎈 [Kart over tog-ruten](/tog/)<br>
- 🗺️ [Kart over skoleområdet](/omraade/) med morsomme leker, spennende aktiviteter og en fristende kafé 🍰☕ <br>

#### Program

- **08:00:** Flaggheising på Helsetunet
  - Askøy skolebrass spiller
- **11:00:** Program på Kleppestø barneskole
  - Opptreden og ord for dagen ved skolens elever.
  - Tale v/ elevrådsleder
- **11:45:** Prosesjonen går fra Kleppestø barneskole til Helsetunet, deretter ned hovedveien til Kleppestø senter, opp Gamle Kleppestøvegen og tilbake til Kleppestø barneskole. [Kart finner du her](/tog/).
- **12:45:** Kafeteria med servering på skolen
  - Leker og spillboder åpnes
  - (Stenger 15:15)
- **15:15:** Arrangementet avsluttes

Vi gleder oss til å feire sammen med dere! 🇳🇴🎶

#### Sponsorer

En stor takk til alle våre sponsorer som bidrar til å gjøre feiringen mulig!

<div class="row">
  {% assign images = site.static_files | where_exp: "file", "file.path contains '/assets/img/'" %}
  {% for image in images %}
    <div class="col-md-4 mb-3">
      <img src="{{ image.path | relative_url }}" alt="{{ image.name }}" class="img-fluid sponsor-img" />
    </div>
  {% endfor %}
</div>

<style>
  .sponsor-img {
    max-width: 200px;
    height: auto;
    margin: 0 auto;
    display: block;
  }
</style>