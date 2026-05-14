import { atom } from 'jotai';
import { activeProfileAtom } from '../atoms/boardState';
import { isSidebarOpenAtom, windowSizeAtom, boardAreaHeightAtom } from '../atoms/uiState';

// Compact separator bar height for column headers (fits 2 lines of text + button)
export const HEADER_BAR_HEIGHT = 40;
// Extra vertical space for SentenceBar items compared to standard cells
export const EXTRA_SENTENCE_BAR_HEIGHT = 24;

export const layoutMetricsAtom = atom((get) => {
  const profile = get(activeProfileAtom);
  const isSidebarOpen = get(isSidebarOpenAtom);
  const { width } = get(windowSizeAtom);
  const totalHeight = get(boardAreaHeightAtom);

  // Sidebar width
  const panelWidth = isSidebarOpen ? (width >= 1200 ? 352 : 300) : 0;
  const sidebarWidth = 72 + panelWidth;
  const availableWidth = Math.max(0, width - sidebarWidth);

  const colWidth = availableWidth / profile.visibleColsCount;

  // VERTICAL LAYOUT:
  //   [sp] SentenceBar [sp] HeaderBar [sp] Row1 [sp] Row2 ... [sp] RowN
  //
  // Fixed heights:
  //   - SentenceBar = rowHeight + EXTRA_SENTENCE_BAR_HEIGHT (content) + sp (gap above)
  //   - HeaderBar   = HEADER_BAR_HEIGHT + sp (gap above)
  //   - Each row    = rowHeight + sp (gap above)
  //
  // Total = sp + (rowHeight + EXTRA) + sp + HEADER_BAR_HEIGHT + sp + N*(rowHeight + sp)
  //       = (N+1)*rowHeight + EXTRA + (N+2)*sp + HEADER_BAR_HEIGHT
  //
  // Solve for rowHeight:
  //   (N+1)*rowHeight = totalHeight - EXTRA - HEADER_BAR_HEIGHT - (N+2)*sp

  const N = profile.visibleRowsCount;
  const sp = profile.spacing;

  const rowHeight = profile.isSquare
    ? colWidth
    : (totalHeight - EXTRA_SENTENCE_BAR_HEIGHT - HEADER_BAR_HEIGHT - (N + 2) * sp) / (N + 1);

  return {
    colWidth,
    rowHeight: Math.max(20, rowHeight),
    headerBarHeight: HEADER_BAR_HEIGHT,
    extraSentenceBarHeight: EXTRA_SENTENCE_BAR_HEIGHT,
    availableWidth,
  };
});
