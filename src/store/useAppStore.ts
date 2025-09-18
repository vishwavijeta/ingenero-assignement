import { create } from 'zustand'
import { checklistItems } from '../data'
import type { Electrolyzer, ElementPart, ChecklistItem, Comment } from '../types'

interface AppState {
  // Core state
  selectedElectrolyzer: Electrolyzer | null
  selectedElements: ElementPart[]
  checklist: ChecklistItem[]
  comments: Comment[]
  cutOutComments: string
  searchTerm: string
  
  // Modal state
  showModal: boolean
  modalType: 'repair' | 'assemble' | null
  
  // Actions
  selectElectrolyzer: (electrolyzer: Electrolyzer) => void
  selectElement: (element: ElementPart) => void
  selectAllElements: () => void
  toggleChecklistItem: (itemId: string) => void
  updateComment: (elementId: string, comment: string) => void
  updateCutOutComments: (comment: string) => void
  setSearchTerm: (term: string) => void
  showConfirmationModal: (type: 'repair' | 'assemble') => void
  hideModal: () => void
  confirmAction: () => void
  clearChecklistSelection: () => void
  updateComputedValues: () => void
  
  // Computed values
  selectedChecklistCount: number
  selectableElements: ElementPart[]
  isAllSelected: boolean
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  selectedElectrolyzer: null,
  selectedElements: [],
  checklist: checklistItems,
  comments: [],
  cutOutComments: '',
  searchTerm: '',
  showModal: false,
  modalType: null,

  // Computed values
  selectedChecklistCount: 0,
  selectableElements: [],
  isAllSelected: false,

  // Actions
  selectElectrolyzer: (electrolyzer: Electrolyzer) => {
    set({
      selectedElectrolyzer: electrolyzer,
      selectedElements: [],
      comments: [],
      cutOutComments: '',
      checklist: checklistItems.map(item => ({ ...item, isSelected: false }))
    })
    get().updateComputedValues()
  },

  selectElement: (element: ElementPart) => {
    const { selectedElements, comments } = get()
    
    // Don't allow selection of elements that are already processed
    if (element.status !== 'default') {
      return
    }
    
    const isSelected = selectedElements.some(el => el.id === element.id)
    
    if (isSelected) {
      set({
        selectedElements: selectedElements.filter(el => el.id !== element.id),
        comments: comments.filter(comment => comment.elementId !== element.id)
      })
    } else {
      set({
        selectedElements: [...selectedElements, element],
        comments: [...comments, { elementId: element.id, comment: '' }]
      })
    }
    get().updateComputedValues()
  },

  selectAllElements: () => {
    const { selectedElectrolyzer, selectedElements, comments } = get()
    
    if (!selectedElectrolyzer) return
    
    const selectableElements = selectedElectrolyzer.elements.filter(el => el.status === 'default')
    const selectedSelectableElements = selectedElements.filter(el => 
      selectableElements.some(sel => sel.id === el.id)
    )
    
    if (selectedSelectableElements.length === selectableElements.length) {
      // Deselect all selectable elements
      set({
        selectedElements: selectedElements.filter(el => 
          !selectableElements.some(sel => sel.id === el.id)
        ),
        comments: comments.filter(comment => 
          !selectableElements.some(sel => sel.id === comment.elementId)
        )
      })
    } else {
      // Select all selectable elements
      set({
        selectedElements: [...selectedElements, ...selectableElements],
        comments: [...comments, ...selectableElements.map(el => ({ elementId: el.id, comment: '' }))]
      })
    }
    get().updateComputedValues()
  },

  toggleChecklistItem: (itemId: string) => {
    set(state => ({
      checklist: state.checklist.map(item => 
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    }))
    get().updateComputedValues()
  },

  updateComment: (elementId: string, comment: string) => {
    set(state => ({
      comments: state.comments.map(c => 
        c.elementId === elementId ? { ...c, comment } : c
      )
    }))
  },

  updateCutOutComments: (comment: string) => {
    set({ cutOutComments: comment })
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term })
  },

  showConfirmationModal: (type: 'repair' | 'assemble') => {
    set({ showModal: true, modalType: type })
  },

  hideModal: () => {
    set({ showModal: false, modalType: null })
  },

  confirmAction: () => {
    const { selectedElectrolyzer, selectedElements, modalType } = get()
    
    if (!selectedElectrolyzer || !modalType) return

    const updatedElements = selectedElectrolyzer.elements.map(element => {
      if (selectedElements.some(sel => sel.id === element.id)) {
        return {
          ...element,
          status: modalType === 'repair' ? 'ready-for-repair' as const : 'ready-for-assemble' as const,
          isSelected: false
        }
      }
      return element
    })

    set({
      selectedElectrolyzer: { ...selectedElectrolyzer, elements: updatedElements },
      selectedElements: [],
      comments: [],
      cutOutComments: '',
      checklist: checklistItems.map(item => ({ ...item, isSelected: false })),
      showModal: false,
      modalType: null
    })
    get().updateComputedValues()
  },

  clearChecklistSelection: () => {
    set({
      checklist: checklistItems.map(item => ({ ...item, isSelected: false }))
    })
    get().updateComputedValues()
  },

  // Helper to update computed values
  updateComputedValues: () => {
    const state = get()
    const selectedChecklistCount = state.checklist.filter(item => item.isSelected).length
    const selectableElements = state.selectedElectrolyzer?.elements.filter(el => el.status === 'default') || []
    const selectedSelectableElements = state.selectedElements.filter(el => 
      selectableElements.some(sel => sel.id === el.id)
    )
    const isAllSelected = selectedSelectableElements.length === selectableElements.length && selectableElements.length > 0

    set({
      selectedChecklistCount,
      selectableElements,
      isAllSelected
    })
  }
}))
