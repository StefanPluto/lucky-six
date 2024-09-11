export const getCurrentTutorialTab = (
  section,
  highlightedSection,
  tutorialRunning
) => {
  if (!tutorialRunning) return;

  if (section === highlightedSection) {
    return {
      borderStyle: "ridge",
      borderWidth: "3px",
      borderColor: "#d4af37",
      filter: "brightness(150%)",
      pointerEvents: "none",
    };
  } else
    return {
      filter: "brightness(25%)",
      pointerEvents: "none",
    };
};
