import { AtemState, Enums } from 'atem-connection'
import {
  CompanionInputFieldCheckbox,
  CompanionInputFieldDropdown,
  CompanionInputFieldNumber
} from '../../../instance_skel_types'
import {
  CHOICES_SSRCBOXES,
  GetAuxIdChoices,
  GetDSKIdChoices,
  GetMEIdChoices,
  GetMultiviewerIdChoices,
  GetSourcesListForType,
  GetSuperSourceIdChoices,
  GetTransitionStyleChoices,
  GetUSKIdChoices,
  SourcesToChoices,
  GetMediaPlayerChoices
} from './choices'
import { ModelSpec } from './models'
import { iterateTimes, MEDIA_PLAYER_SOURCE_CLIP_OFFSET } from './util'

export function AtemMESourcePicker(model: ModelSpec, state: AtemState, id: number): CompanionInputFieldDropdown {
  return {
    id: `input${id ? id : ''}`,
    label: `Input${id ? ` Option ${id}` : ''}`,
    type: 'dropdown',
    default: 1,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'me'))
  }
}
export function AtemTransitionStylePicker(skipSting?: boolean): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'style',
    label: 'Transition Style',
    default: Enums.TransitionStyle.MIX,
    choices: GetTransitionStyleChoices(skipSting)
  }
}
export function AtemTransitionRatePicker(): CompanionInputFieldNumber {
  return {
    type: 'number',
    id: 'rate',
    label: 'Transition Rate',
    min: 1,
    max: 250,
    range: true,
    default: 25
  }
}
export function AtemTransitionSelectionPickers(model: ModelSpec): CompanionInputFieldCheckbox[] {
  const pickers: CompanionInputFieldCheckbox[] = [
    {
      type: 'checkbox',
      id: 'background',
      label: 'Background',
      default: true
    }
  ]

  for (let i = 0; i < model.USKs; i++) {
    pickers.push({
      type: 'checkbox',
      id: `key${i}`,
      label: `Key ${i + 1}`,
      default: false
    })
  }

  return pickers
}
export function AtemMEPicker(model: ModelSpec, id: number): CompanionInputFieldDropdown {
  return {
    id: `mixeffect${id ? id : ''}`,
    label: `M/E${id ? ` Option ${id}` : ''}`,
    type: 'dropdown',
    default: id > 0 ? id - 1 : 0,
    choices: GetMEIdChoices(model)
  }
}
export function AtemDSKPicker(model: ModelSpec): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    label: 'Key',
    id: 'key',
    default: 0,
    choices: GetDSKIdChoices(model)
  }
}
export function AtemUSKPicker(model: ModelSpec): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    label: 'Key',
    id: 'key',
    default: 0,
    choices: GetUSKIdChoices(model)
  }
}
export function AtemAuxPicker(model: ModelSpec): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'aux',
    label: 'AUX',
    default: 0,
    choices: GetAuxIdChoices(model)
  }
}
export function AtemMultiviewerPicker(model: ModelSpec): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'multiViewerId',
    label: 'MV',
    default: 0,
    choices: GetMultiviewerIdChoices(model)
  }
}
export function AtemKeyFillSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    label: 'Fill Source',
    id: 'fill',
    default: 1,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'me'))
  }
}
export function AtemKeyCutSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    label: 'Key Source',
    id: 'cut',
    default: 0,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'me'))
  }
}
export function AtemAuxSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    label: 'Input',
    id: 'input',
    default: 1,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'aux'))
  }
}
export function AtemSuperSourceBoxPicker(): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'boxIndex',
    label: 'Box #',
    default: 0,
    choices: CHOICES_SSRCBOXES
  }
}
export function AtemSuperSourceIdPicker(model: ModelSpec): CompanionInputFieldDropdown | undefined {
  const choices = GetSuperSourceIdChoices(model)
  if (choices.length > 1) {
    return {
      type: 'dropdown',
      id: 'ssrcId',
      label: 'Super Source',
      default: 0,
      choices
    }
  } else {
    return undefined
  }
}
export function AtemSuperSourcePropertiesPickers(): Array<CompanionInputFieldNumber | CompanionInputFieldCheckbox> {
  return [
    {
      type: 'number',
      id: 'size',
      label: 'Size',
      min: 0,
      max: 1000,
      range: true,
      default: 500
    },
    {
      type: 'number',
      id: 'x',
      label: 'X',
      min: -4800,
      max: 4800,
      range: true,
      default: 0
    },
    {
      type: 'number',
      id: 'y',
      label: 'Y',
      min: -2700,
      max: 2700,
      range: true,
      default: 0
    },
    {
      type: 'checkbox',
      id: 'cropEnable',
      label: 'Crop Enable',
      default: false
    },
    {
      type: 'number',
      id: 'cropTop',
      label: 'Crop Top',
      min: 0,
      max: 1800,
      range: true,
      default: 0
    },
    {
      type: 'number',
      id: 'cropBottom',
      label: 'Crop Bottom',
      min: 0,
      max: 1800,
      range: true,
      default: 0
    },
    {
      type: 'number',
      id: 'cropLeft',
      label: 'Crop Left',
      min: 0,
      max: 3200,
      range: true,
      default: 0
    },
    {
      type: 'number',
      id: 'cropRight',
      label: 'Crop Right',
      min: 0,
      max: 3200,
      range: true,
      default: 0
    }
  ]
}
export function AtemSuperSourceBoxSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'source',
    label: 'Source',
    default: 0,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'me'))
  }
}
export function AtemMultiviewSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'source',
    label: 'Source',
    default: 0,
    choices: SourcesToChoices(GetSourcesListForType(model, state, 'mv'))
  }
}
export function AtemMultiviewWindowPicker(model: ModelSpec): CompanionInputFieldDropdown {
  const choices = model.multiviewerFullGrid
    ? iterateTimes(16, i => ({
        id: i,
        label: `Window ${i + 1}`
      }))
    : iterateTimes(8, i => ({
        id: i + 2,
        label: `Window ${i + 3}`
      }))

  return {
    type: 'dropdown',
    id: 'windowIndex',
    label: 'Window #',
    default: 2,
    choices
  }
}
export function AtemMediaPlayerPicker(model: ModelSpec): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'mediaplayer',
    label: 'Media Player',
    default: 0,
    choices: GetMediaPlayerChoices(model)
  }
}

export function AtemMediaPlayerSourcePicker(model: ModelSpec, state: AtemState): CompanionInputFieldDropdown {
  return {
    type: 'dropdown',
    id: 'source',
    label: 'Source',
    default: 0,
    choices: [
      ...iterateTimes(model.media.clips, i => {
        const clip = state.media.clipPool[i]
        return {
          id: i + MEDIA_PLAYER_SOURCE_CLIP_OFFSET,
          label: clip && clip.name ? `Clip #${i + 1}: ${clip.name}` : `Clip #${i + 1}`
        }
      }),
      ...iterateTimes(model.media.stills, i => {
        const still = state.media.stillPool[i]
        return {
          id: i,
          label: still && still.fileName ? `Still #${i + 1}: ${still.fileName}` : `Still #${i + 1}`
        }
      })
    ]
  }
}