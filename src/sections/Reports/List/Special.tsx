import type { CustomCellRendererProps } from '@ag-grid-community/react';
import type { ColDef, ITextFilterParams } from '@ag-grid-community/core';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

import { AgGrid } from 'src/components/AgGrid';
import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';

import { SPECIAL_REPORT } from './const';
import { useGenerateWinnerReports } from '../useApollo';

import type { SpecialReport } from './type';

export default function Special() {
  const { loading, generateWinnerReport } = useGenerateWinnerReports();

  const handleGenerate = async () => {
    try {
      const { data } = await generateWinnerReport();

      if (data?.generateWDMSVegasReport.result === 'success') {
        toast.success('Successfully generated report');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const colDefs = useMemo<ColDef<SpecialReport>[]>(
    () => [
      {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
      },
      {
        field: 'link',
        headerName: 'Link',
        flex: 1,
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: false,
        filterParams: { buttons: ['reset'] } as ITextFilterParams,
        cellRenderer: ({ data }: CustomCellRendererProps<SpecialReport>) => (
          <Link to={data?.link!} target="_blank">
            {data?.link}
          </Link>
        ),
      },
      {
        colId: 'action',
        width: 60,
        pinned: 'right',
        resizable: false,
        editable: false,
        sortable: false,
        cellRenderer: () => (
          <IconButton color="default" onClick={handleGenerate}>
            <Iconify
              icon={loading ? 'eos-icons:bubble-loading' : 'streamline:ai-generate-variation-spark'}
              width={15}
              height={15}
            />
          </IconButton>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading]
  );

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <AgGrid<SpecialReport>
        gridKey="report-revenue-list"
        rowData={SPECIAL_REPORT}
        columnDefs={colDefs}
        totalRowCount={SPECIAL_REPORT.length}
      />
    </Card>
  );
}
