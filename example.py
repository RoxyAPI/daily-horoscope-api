"""
Daily horoscope by zodiac sign: transit-based forecast with house activations unique per sign.
Returns overview, love, career, health, finance, lucky fields, active transits, moon data, energy rating.
Part of the RoxyAPI Western astrology domain.
"""

import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])


def main():
    # Daily horoscope: zodiac sign forecast driven by current planetary transits
    horoscope = roxy.astrology.get_daily_horoscope(sign="aries")

    print("Sign:", horoscope["sign"])
    print("Date:", horoscope["date"])
    print()
    print("Overview:", horoscope["overview"])
    print()
    print("Love:   ", horoscope["love"])
    print("Career: ", horoscope["career"])
    print("Health: ", horoscope["health"])
    print("Finance:", horoscope["finance"])
    print("Advice: ", horoscope["advice"])
    print()
    print("Lucky number:", horoscope["luckyNumber"])
    print("Lucky color: ", horoscope["luckyColor"])
    print("Compatible signs:", horoscope["compatibleSigns"])
    print()
    print("Moon sign: ", horoscope["moonSign"])
    print("Moon phase:", horoscope["moonPhase"])
    print("Energy rating:", horoscope["energyRating"], "/ 10")
    print()
    print("Active transits:")
    for t in horoscope["activeTransits"]:
        print("  -", t)


if __name__ == "__main__":
    main()
