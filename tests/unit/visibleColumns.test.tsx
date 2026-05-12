import { renderHook } from '@testing-library/react';
import { Provider, createStore, useAtomValue } from 'jotai';
import { expect, test } from 'vitest';
import { boardDataAtom, hiddenColumnsAtom, activeProfileAtom, carouselStartIndexAtom } from '../../src/store/atoms/boardState';
import { visibleColumnsAtom } from '../../src/store/selectors/visibleColumns';
import React from 'react';

const mockBoardData = {
  actividad: 'Test',
  formato: 'Test',
  columnas: [
    { tipo: 'C1', contenido: ['A'] },
    { tipo: 'C2', contenido: ['B'] },
    { tipo: 'C3', contenido: ['C'] },
    { tipo: 'C4', contenido: ['D'] },
  ]
};

const TestWrapper = ({ children, initStore }: any) => {
  const store = createStore();
  store.set(boardDataAtom, mockBoardData);
  if (initStore) initStore(store);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

test('visibleColumnsAtom: retorna columnas según el límite', () => {
  const { result } = renderHook(() => useAtomValue(visibleColumnsAtom), {
    wrapper: ({ children }) => (
      <TestWrapper initStore={(store: any) => {
        store.set(activeProfileAtom, { visibleColsCount: 2 });
      }}>
        {children}
      </TestWrapper>
    )
  });

  expect(result.current.length).toBe(2);
  expect(result.current[0].tipo).toBe('C1');
  expect(result.current[1].tipo).toBe('C2');
});

test('visibleColumnsAtom: filtra columnas ocultas y aplica rotación circular', () => {
  const { result } = renderHook(() => useAtomValue(visibleColumnsAtom), {
    wrapper: ({ children }) => (
      <TestWrapper initStore={(store: any) => {
        store.set(activeProfileAtom, { visibleColsCount: 3 });
        store.set(hiddenColumnsAtom, new Set(['C2'])); // Ocultamos C2
        store.set(carouselStartIndexAtom, 2); // Empezamos en el índice 2 (que será la última disponible: C4)
      }}>
        {children}
      </TestWrapper>
    )
  });

  // Disponibles: C1, C3, C4. Índice de inicio: 2 (C4).
  // Debería traer: C4, C1, C3
  expect(result.current.length).toBe(3);
  expect(result.current[0].tipo).toBe('C4');
  expect(result.current[1].tipo).toBe('C1');
  expect(result.current[2].tipo).toBe('C3');
});
