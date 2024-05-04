import { useOnlyIcon } from '@/Components/Layout/NavContext';

export const CalendarStylesWrapper = (() => {
  const { palette, color, colorX } = useOnlyIcon();
  const paletteGradientColor = `linear-gradient(45deg, ${color} 30%, ${colorX} 90%)`;

  return {
    '& .fc': {
      '.fc-toolbar-title': {
        fontSize: '18px',
        color: palette.text.secondary,
      },
      '.fc-toolbar-chunk': {
        display: 'flex',
        alignItems: 'center',
      },
      '.fc-prev-button, & .fc-next-button': {
        display: 'inline-block',
        borderColor: 'transparent !important',
        backgroundColor: 'transparent !important',

        '&:hover, &:active, &:focus': {
          boxShadow: 'none !important',
          borderColor: 'transparent !important',
          backgroundColor: 'transparent !important',
        },
        '.fc-icon': {
          color: palette.text.secondary,
        },
      },

      '.fc-more-link': {
        color: palette.text.secondary
      },

      '.fc-timegrid-axis-cushion': {
        color: palette.text.secondary
      },

      '.fc-timegrid-slot-label-cushion': {
        color: palette.text.secondary
      },

      '.fc-list-event-title, & .fc-list-event-time': {
        color: palette.text.secondary
      },

      '.fc-list-event:hover td': {
        background: paletteGradientColor,
        cursor: 'pointer'
      },

      '.fc-event': {
        color: palette.text.secondary
      },

      '.fc--button': {
        display: 'none',
      },

      //top right side buttons
      '& .fc-button-group': {
        '& .fc-button': {
          textTransform: 'capitalize',
          '&:focus': {
            boxShadow: 'none',
          },
        },

        '& .fc-button-primary': {
          '&:not(.fc-prev-button):not(.fc-next-button):not(.fc-sidebarToggle-button)': {
            color: palette.text.secondary,
            borderColor: '#D3D3D3',
            backgroundColor: palette.customColors.boxBg,
            '&.fc-button-active, &:hover': {
              background: paletteGradientColor,
              color: '#fff'
            },
          },
        },
      },

      //week cell
      '& .fc-col-header': {
        '& .fc-col-header-cell': {
          fontWeight: 500,
          fontSize: '1rem',
          color: palette.text.secondary,
          '& .fc-col-header-cell-cushion': {
            padding: '',
            textDecoration: 'none !important',
          },
        },
      },
    },
  };
});



