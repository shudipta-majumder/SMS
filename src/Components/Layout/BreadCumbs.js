'use client';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { usePathname, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useOnlyIcon } from './NavContext';

export default function CustomSeparator() {
  const router = useRouter();
  const pathname = usePathname();
  const { palette, color } = useOnlyIcon();

  function convertToTitleCase(inputString) {
    return inputString
      .split(' ')
      .map((word, i) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      sx={{
        '&:hover': {
          textDecoration: 'none',
          cursor: 'pointer',
        },
        '.MuiBreadcrumbs-separator ': {
          color: palette.text.secondary,
        },
      }}
    >
      {/* {pathnames.length > 0 ? (
        <Link
          underline="hover"
          key="1"
          color="inherit"
          onClick={() => router.push("/")}
        >
          Home
        </Link>
      ) : (
        <Typography> Home </Typography>
      )} */}

      {pathname === '/dashboard' ? (
        ''
      ) : (
        <Link
          underline='hover'
          key='1'
          onClick={() => router.push('/dashboard')}
          sx={{
            fontWeight: 500,
            color: color,
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          Dashboard
        </Link>
      )}

      {pathname === '/dashboard'
        ? ''
        : pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isFirst = index === pathnames.indexOf(pathnames[0]);
            const isLast = index === pathnames.length - 1;
            const colors = isLast ? palette.text.secondary : palette.text.modarate;
            const LinkName = convertToTitleCase(name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '));
            const ignoredSegment = '/dashboard';
            const LinkNames = LinkName.replace(ignoredSegment, '');

            return isFirst ? (
              <Typography
                sx={{
                  '&:hover': {
                    cursor: 'default',
                  },
                }}
                color={colors}
              >
                {' '}
                {LinkNames}{' '}
              </Typography>
            ) : isLast ? (
              <Typography
                sx={{
                  '&:hover': {
                    cursor: 'default',
                  },
                }}
                color={colors}
              >
                {' '}
                {LinkNames}{' '}
              </Typography>
            ) : (
              <Box>
                <Link
                  underline='hover'
                  key='1'
                  onClick={() => router.push(routeTo)}
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                  color={colors}
                >
                  {LinkNames}
                </Link>
              </Box>
            );
          })}
    </Breadcrumbs>
  );
}
