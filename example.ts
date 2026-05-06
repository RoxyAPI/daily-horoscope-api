import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

/**
 * Daily horoscope by zodiac sign: transit-based forecast with house activations unique per sign.
 * Returns overview, love, career, health, finance, lucky fields, active transits, moon data, energy rating.
 * Part of the RoxyAPI Western astrology domain.
 */
async function main() {
  const { data, error } = await roxy.astrology.getDailyHoroscope({
    path: { sign: 'aries' },
  });

  if (error) throw new Error(error.error);

  console.log('Sign:', data.sign);
  console.log('Date:', data.date);
  console.log('');
  console.log('Overview:', data.overview);
  console.log('');
  console.log('Love:    ', data.love);
  console.log('Career:  ', data.career);
  console.log('Health:  ', data.health);
  console.log('Finance: ', data.finance);
  console.log('Advice:  ', data.advice);
  console.log('');
  console.log('Lucky number:', data.luckyNumber);
  console.log('Lucky color: ', data.luckyColor);
  console.log('Compatible signs:', data.compatibleSigns);
  console.log('');
  console.log('Moon sign: ', data.moonSign);
  console.log('Moon phase:', data.moonPhase);
  console.log('Energy rating:', data.energyRating, '/ 10');
  console.log('');
  console.log('Active transits:');
  for (const t of data.activeTransits) console.log('  -', t);
}

main().catch(console.error);
