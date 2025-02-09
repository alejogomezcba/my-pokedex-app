export const WaitFor = (time: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
export const FormatName = (name: string): string => {
  if (name.includes("♀")) {
    return name.replace("♀", "-f");
  } else if (name.includes("♂")) {
    return name.replace("♂", "-m");
  } else if (name.includes(". ")) {
    return name.replace(". ", "-");
  } else if (name.includes("farfetch'd")) {
    return name.replace("farfetch'd", "farfetchd");
  } else {
    return name;
  }
}
  