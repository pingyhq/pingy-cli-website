/* global $ $$ */
{
  const icon = `
  <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
      <path d="M3.95377421,9.02931429 L8.39442174,0.1656 C8.45862886,0.0519428571 8.54303016,0 8.63934084,0 C8.78484247,0 8.90238293,0.116742857 8.90238293,0.261257143 C8.90238293,0.263828571 8.89565154,0.318342857 8.89565154,0.318342857 L8.14794923,6.31131429 C8.13966444,6.38331429 8.13811104,6.40902857 8.13811104,6.43525714 C8.13811104,6.86777143 8.49228582,7.218 8.9293085,7.218 L13.0727392,7.22211429 C13.6832247,7.26942857 14.1647781,7.77497143 14.1647781,8.39211429 C14.1647781,8.57417143 14.1228363,8.74645714 14.0472376,8.90022857 L9.57603993,17.8261714 L9.54807876,17.8837714 C9.49888782,17.9542286 9.41759332,18 9.32801403,18 C9.1825124,18 9.06341854,17.8837714 9.06341854,17.7387429 C9.06911433,17.6862857 9.81370985,11.7241714 9.81370985,11.7241714 C9.82251244,11.6835429 9.82769043,11.6418857 9.82924383,11.5992 C9.83079723,11.1317143 9.47662245,10.7809714 9.03959977,10.7809714 L4.8920267,10.7768571 C4.28154122,10.7300571 3.79998779,10.2245143 3.79998779,9.60737143 C3.79998779,9.44588571 3.83209135,9.29211429 3.89215608,9.15222857 C3.89215608,9.15171429 3.95377421,9.02931429 3.95377421,9.02931429 Z" id="Path-Copy-2" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>
    </g>
  </svg>`;
  const html = `
  <div class="topbar active" id="menubar">
    <img src="https://pin.gy/images/macos.svg" style="height:16px; margin-left:16px; opacity: 0.1525;">
    <div class="datetime" id="datetime">Fri 15:10</div>
    <div class="shapes">
      <svg class="circle" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" fill="#ddd" />
      </svg>
      <svg class="star" viewBox="30 160 40 45" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" fill="#ddd"/>
      </svg>
      <svg class="square" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" fill="#ddd"/>
      </svg>
      <svg class="zigzag" viewBox="60 110 45 35" width="18" height="18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="#ddd" fill="transparent" stroke-width="5"/>
      </svg>
    </div>

    <div class="pingy-menubar" id="pingy-menubar">${icon}</div>
  </div>
  `;
  const topbar = $$('topbar');
  $$('topbar').forEach(el => (el.innerHTML = html));

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  function setTime() {
    var d = new Date();
    const day = weekday[d.getDay()];
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const dtEl = $('#datetime', topbar[0]);
    dtEl.innerHTML = `${day.slice(0, 3)} ${hours}:${minutes}`;
  }
  setTime();
  setInterval(setTime, 30 * 1000);
}
