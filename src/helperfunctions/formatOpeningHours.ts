export const formatOpeningHours = (open: string[]) => {
  const dayTranslations: Record<string, string> = {
    Monday: "Måndag",
    Tuesday: "Tisdag",
    Wednesday: "Onsdag",
    Thursday: "Torsdag",
    Friday: "Fredag",
    Saturday: "Lördag",
    Sunday: "Söndag",
  };

  const convertTo24Hour = (time: string): string => {
    if (!time) return "";
    const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!match) return time;

    const [_, hourStr, minute, meridian] = match;
    let hour = parseInt(hourStr, 10);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  return open.map((line) => {
    let [dayPart, timePart] = line.split(": ");
    if (!timePart) return line;

    for (const [english, swedish] of Object.entries(dayTranslations)) {
      if (dayPart.includes(english)) {
        dayPart = dayPart.replace(english, swedish);
        break;
      }
    }

    if (timePart.toLowerCase().includes("closed")) {
      return `${dayPart}: Stängt`;
    }
    if (timePart.toLowerCase().includes("open 24 hours")) {
      return `${dayPart}: Öppet 24H dygnet`;
    }

    timePart = timePart.replace(/\s*–\s*/g, "–");

    const [fromRaw, toRaw] = timePart.split("–");
    const from = convertTo24Hour(fromRaw);
    const to = convertTo24Hour(toRaw);

    return `${dayPart}: ${from}–${to}`;
  });
};
