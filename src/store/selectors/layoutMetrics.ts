import { atom } from 'jotai';
import { activeProfileAtom } from '../atoms/boardState';
import { isSidebarOpenAtom, windowSizeAtom, boardAreaHeightAtom, isFullscreenAtom } from '../atoms/uiState';

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
  const isFullscreen = get(isFullscreenAtom);
  const panelWidth = isSidebarOpen ? (width >= 1200 ? 352 : 300) : 0;
  const sidebarWidth = isFullscreen ? 0 : (72 + panelWidth);
  const availableWidth = Math.max(0, width - sidebarWidth);
  const sp = profile.spacing;
  const nCols = profile.visibleColsCount;
  const colWidth = (availableWidth - (nCols - 1) * sp) / nCols;

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
  const currentHeaderHeight = profile.showColumnHeaders ? HEADER_BAR_HEIGHT : 0;
  
  // Revised vertical spacing logic (sp = spacing):
  // 1. Gap above SentenceBar (sp)
  // 2. Gap between SentenceBar and HeaderBar (sp)
  // 3. Gap between HeaderBar and first row (sp)
  // 4. Gaps after each of N rows (N * sp)
  // Total gapsCount = 1 + 1 + 1 + N = N + 3 (if header shown)
  // If no header, gapsCount = N + 2.
  const gapsCount = profile.showColumnHeaders ? (N + 3) : (N + 2);

  const rowHeight = profile.isSquare
    ? colWidth
    : (totalHeight - EXTRA_SENTENCE_BAR_HEIGHT - currentHeaderHeight - gapsCount * sp) / (N + 1);

  return {
    colWidth,
    rowHeight: Math.max(20, rowHeight),
    headerBarHeight: currentHeaderHeight,
    extraSentenceBarHeight: EXTRA_SENTENCE_BAR_HEIGHT,
    availableWidth,
  };
});
