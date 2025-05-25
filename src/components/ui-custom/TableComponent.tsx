import {
  Interface__BatchOptions,
  Interface__LimitControl,
  Interface__PageControl,
  Interface__RowOptions,
  Interface__TableComponent,
  Interface__TableFooterNote,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import useScreen from "@/hooks/useScreen";
import {
  Center,
  HStack,
  Icon,
  MenuSeparator,
  Portal,
  SimpleGrid,
  Table,
  Text,
} from "@chakra-ui/react";
import {
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpDownFilled,
  IconCaretUpFilled,
  IconDots,
  IconMenu,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { toaster } from "../ui/toaster";
import BButton from "./BButton";
import CContainer from "./CContainer";
import ConfirmationDisclosure from "./ConfirmationDisclosure";
import NumberInput from "./NumberInput";

const BatchOptions = ({
  selectedRows,
  batchOptions,
  selectAllRows,
  handleSelectAllRows,
  tableRef,
}: Interface__BatchOptions) => {
  // Contexts
  const { l } = useLang();

  // States, Refs
  const { themeConfig } = useThemeConfig();

  return (
    <MenuRoot lazyMount closeOnSelect={false}>
      <MenuTrigger
        asChild
        // borderRadius={"full"}
        aria-label="batch options"
      >
        <BButton iconButton unclicky variant={"ghost"} size={"xs"}>
          <Icon>
            <IconMenu />
          </Icon>
        </BButton>
      </MenuTrigger>

      <Portal container={tableRef}>
        <MenuContent zIndex={10} minW={"140px"}>
          <CContainer px={2} py={1}>
            <Text
              color={"light"}
              fontSize={"xs"}
              opacity={0.5}
              fontWeight={500}
            >
              {selectedRows.length} {l.selected}
            </Text>
          </CContainer>

          <MenuSeparator />

          <MenuItem
            value={"select all"}
            justifyContent={"space-between"}
            onClick={() => {
              handleSelectAllRows(selectAllRows);
            }}
            closeOnSelect={false}
          >
            <Text color={"light"}>{l.select_all}</Text>
            <Checkbox
              borderColor={"d3"}
              checked={selectAllRows}
              size={"sm"}
              colorPalette={themeConfig.colorPalette}
            />
          </MenuItem>

          <MenuSeparator />

          {batchOptions?.map((option, i) => {
            const disabled = selectedRows?.length === 0;

            if (option === "divider") return <MenuSeparator key={i} />;

            if (option.confirmation) {
              return (
                <ConfirmationDisclosure
                  id={option.confirmation(selectedRows).id}
                  title={option.confirmation(selectedRows).title}
                  description={option.confirmation(selectedRows).description}
                  confirmLabel={option.confirmation(selectedRows).confirmLabel}
                  confirmCallback={
                    option.confirmation(selectedRows).confirmCallback
                  }
                  confirmButtonProps={
                    option.confirmation(selectedRows).confirmButtonProps
                  }
                  disabled={disabled}
                  key={i}
                >
                  <MenuItem
                    key={i}
                    value={option.label}
                    disabled={
                      typeof option?.disabled === "boolean"
                        ? option?.disabled
                        : disabled
                    }
                    color={"light"}
                    justifyContent={"space-between"}
                    {...option.menuItemProps}
                  >
                    {option.label}
                    {option.icon}
                  </MenuItem>
                </ConfirmationDisclosure>
              );
            }

            return (
              <MenuItem
                key={i}
                value={option.label}
                onClick={() => {
                  option.callback &&
                    ((option.menuItemProps && !option.menuItemProps.disabled) ||
                      !disabled) &&
                    option.callback(selectedRows);
                }}
                color={"light"}
                disabled={
                  typeof option?.disabled === "boolean"
                    ? option?.disabled
                    : disabled
                }
                justifyContent={"space-between"}
                {...option.menuItemProps}
              >
                {option.label}
                {option.icon}
              </MenuItem>
            );
          })}
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

const RowOptions = ({
  rowData,
  rowOptions,
  tableRef,
}: Interface__RowOptions) => {
  return (
    <MenuRoot lazyMount>
      <MenuTrigger asChild aria-label="row options">
        <BButton iconButton unclicky variant={"ghost"} size={"xs"}>
          <Icon fontSize={"lg !important"}>
            <IconDots />
          </Icon>
        </BButton>
      </MenuTrigger>

      <Portal container={tableRef}>
        <MenuContent zIndex={10} className="rowOptionsList" minW={"140px"}>
          {rowOptions?.map((option, i) => {
            if (option === "divider") return <MenuSeparator key={i} />;

            if (option.confirmation) {
              return (
                <ConfirmationDisclosure
                  key={i}
                  id={option.confirmation(rowData).id}
                  title={option.confirmation(rowData).title}
                  description={option.confirmation(rowData).description}
                  confirmLabel={option.confirmation(rowData).confirmLabel}
                  confirmCallback={option.confirmation(rowData).confirmCallback}
                  confirmButtonProps={
                    option.confirmation(rowData)?.confirmButtonProps
                  }
                  disabled={
                    typeof option?.disabled === "boolean"
                      ? option.disabled
                      : !!option?.disabled?.(rowData)
                  }
                >
                  <MenuItem
                    key={i}
                    value={option.label}
                    justifyContent={"space-between"}
                    color={"light"}
                    disabled={
                      typeof option?.disabled === "boolean"
                        ? option.disabled
                        : !!option?.disabled?.(rowData)
                    }
                    {...option.menuItemProps}
                  >
                    {option.label}
                    {option.icon}
                  </MenuItem>
                </ConfirmationDisclosure>
              );
            }

            return (
              <MenuItem
                key={i}
                value={option.label}
                color={"light"}
                onClick={() => {
                  if (
                    option.callback &&
                    (!option.menuItemProps || !option.disabled)
                  ) {
                    option.callback(rowData);
                  }
                }}
                justifyContent={"space-between"}
                disabled={
                  typeof option?.disabled === "boolean"
                    ? option.disabled
                    : !!option.disabled?.(rowData)
                }
                {...option.menuItemProps}
              >
                {option.label}
                {option.icon}
              </MenuItem>
            );
          })}
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

const TableFooterNote = ({ footerContent }: Interface__TableFooterNote) => {
  return (
    <CContainer
      display={[!footerContent ? "none" : "", null, "block"]}
      my={"auto"}
    >
      {footerContent}
    </CContainer>
  );
};

const LimitControl = ({
  initialLimit,
  limitControl,
  setLimitControl,
  limitOptions,
  ...props
}: Interface__LimitControl) => {
  // Contexts
  const { l } = useLang();

  // States, Refs
  const [limit, setLimit] = useState(initialLimit);
  const limits = limitOptions || [
    initialLimit,
    initialLimit * 5,
    initialLimit * 10,
  ];

  return (
    <CContainer align={"start"} {...props}>
      {limitControl && setLimitControl && (
        <MenuRoot>
          <MenuTrigger asChild>
            <BButton
              unclicky
              // w={"full"}
              variant={"ghost"}
              size={"xs"}
              justifyContent={"space-between"}
            >
              <HStack gap={1}>
                {l.show}
                <Text fontWeight={"bold"}>{limit === 0 ? l.all : limit}</Text>
              </HStack>

              <Icon maxW={"13px"} ml={1}>
                <IconCaretDownFilled />
              </Icon>
            </BButton>
          </MenuTrigger>

          <MenuContent>
            {limits.map((item, i) => (
              <MenuItem
                key={i}
                value={`${item}`}
                fontWeight={item === limit ? "bold" : ""}
                onClick={() => {
                  setLimit(item);
                }}
              >
                {item}
              </MenuItem>
            ))}
            <MenuItem
              value={`0`}
              fontWeight={0 === limit ? "bold" : ""}
              onClick={() => {
                setLimit(0);
              }}
            >
              {l.all}
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      )}
    </CContainer>
  );
};

const PageControl = ({
  initialPage,
  pageControl,
  setPageControl,
  pagination,
  ...props
}: Interface__PageControl) => {
  // Contexts
  const { themeConfig } = useThemeConfig();
  const { l } = useLang();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      page: initialPage,
    },
    validationSchema: yup.object().shape({
      page: yup.number(),
    }),
    onSubmit: (values) => {
      if (
        values.page &&
        values.page > 0 &&
        values.page <= pagination?.meta?.last_page &&
        setPageControl
      ) {
        setPageControl(values.page);
      } else {
        toaster.create({
          type: "error",
          title: `Lompat Page Gagal`,
          description: `Input harus lebih dari 0 dan kurang dari/sama dengan halaman terakhir`,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    },
  });
  useEffect(() => {
    if (pageControl) {
      formik.setFieldValue("page", pageControl);
    }
  }, [pageControl]);

  return (
    <CContainer ml={["", null, "auto"]} {...props}>
      {pageControl && setPageControl && pagination && (
        <HStack w={"full"} gap={1} justify={"end"}>
          <BButton
            unclicky
            iconButton
            // variant={iss ? "outline" : "ghost"}
            variant={"ghost"}
            onClick={() => {
              if (pageControl > 1) {
                setPageControl(pageControl - 1);
              }
            }}
            disabled={pageControl <= 1}
            borderRadius={themeConfig.radii.component}
            size={"xs"}
          >
            <Icon maxH={"14px"}>
              <IconCaretLeftFilled />
            </Icon>
          </BButton>

          <MenuRoot>
            <MenuTrigger asChild>
              <BButton
                unclicky
                variant={"ghost"}
                size={"xs"}
                // minW={"45px"}
                // flex={1}
                // borderRadius={0}
              >
                {pageControl}
              </BButton>
            </MenuTrigger>

            <MenuContent w={"140px"}>
              <CContainer px={2} py={1} mb={1}>
                <Text
                  fontSize={"sm"}
                  opacity={0.5}
                  fontWeight={500}
                  color={"light"}
                >
                  {l.last} : {pagination?.meta?.last_page || "?"}
                </Text>
              </CContainer>

              <form id="page-jump-form" onSubmit={formik.handleSubmit}>
                <Field>
                  <NumberInput
                    inputValue={formik.values.page}
                    onChangeSetter={(input) => {
                      formik.setFieldValue("page", input);
                    }}
                    color={"light"}
                    textAlign={"center"}
                    borderColor={"d3 !important"}
                    // _focus={{ borderColor: themeConfig.primaryColor }}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        formik.submitForm();
                      }
                    }}
                  />
                </Field>
              </form>

              <BButton
                type="submit"
                form="page-jump-form"
                w={"full"}
                mt={1}
                className="btn-solid"
                borderColor={"d3"}
                // variant={"outline"}
                color={"white"}
              >
                Go
              </BButton>
            </MenuContent>
          </MenuRoot>

          <BButton
            iconButton
            unclicky
            // variant={iss ? "outline" : "ghost"}
            variant={"ghost"}
            onClick={() => {
              setPageControl(pageControl + 1);
            }}
            disabled={pageControl === pagination.meta.last_page}
            borderRadius={themeConfig.radii.component}
            size={"xs"}
          >
            <Icon maxH={"14px"}>
              <IconCaretRightFilled />
            </Icon>
          </BButton>
        </HStack>
      )}
    </CContainer>
  );
};

const TableComponent = ({
  ths,
  tds,
  rowClick,
  originalData,
  columnsConfig,
  rowOptions,
  batchOptions,
  initialSortOrder,
  initialSortColumnIndex,
  trBodyProps,
  initialLimit = 10,
  initialPage = 1,
  footerContent,
  pagination,
  pageControl,
  setPageControl,
  limitOptions,
  limitControl,
  setLimitControl,
  footerContainerProps,
  ...props
}: Interface__TableComponent) => {
  // Hooks
  const iss = useIsSmScreenWidth();
  const { sh } = useScreen();

  // Refs
  const tableRef = useRef(null);

  // States
  const { themeConfig } = useThemeConfig();
  const tableHeader = columnsConfig
    ? columnsConfig.map((columnIndex) => ths[columnIndex])
    : ths;
  1;
  const tableBody = columnsConfig
    ? tds.map((data) => {
        const filteredColumns = columnsConfig.map(
          (columnIndex) => data.columnsFormat[columnIndex]
        );
        return { ...data, columnsFormat: filteredColumns };
      })
    : [...tds];
  const [originalDataState, setOriginalDataState] = useState(tds);
  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    sortColumnIndex: number | undefined;
    direction: "asc" | "desc";
  }>({
    sortColumnIndex: initialSortColumnIndex || undefined,
    direction: initialSortOrder || "asc",
  });
  const sort = (columnIndex: number) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.sortColumnIndex === columnIndex) {
        if (prevConfig.direction === "asc") {
          return { sortColumnIndex: columnIndex, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          // Jika sudah desc, hilangkan sorting (reset ke initial state)
          return { sortColumnIndex: undefined, direction: "asc" };
        }
      } else {
        // Jika kolom belum diurutkan, mulai dari ascending
        return { sortColumnIndex: columnIndex, direction: "asc" };
      }

      return prevConfig;
    });
  };
  const sortedData = () => {
    if (
      sortConfig.sortColumnIndex !== undefined &&
      sortConfig.sortColumnIndex !== null
    ) {
      return tableBody.sort((a, b) => {
        const columnIndex = sortConfig.sortColumnIndex as number;

        const aValue = a.columnsFormat[columnIndex]?.value ?? "";
        const bValue = b.columnsFormat[columnIndex]?.value ?? "";

        type SortHandler = (
          aValue: any,
          bValue: any,
          direction: "asc" | "desc"
        ) => number;

        const sortHandlers: Record<string, SortHandler> = {
          string: (aValue, bValue, direction) =>
            direction === "asc"
              ? String(aValue).localeCompare(String(bValue))
              : String(bValue).localeCompare(String(aValue)),

          number: (aValue, bValue, direction) =>
            direction === "asc"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue),

          date: (aValue, bValue, direction) => {
            const dateA = new Date(aValue).getTime();
            const dateB = new Date(bValue).getTime();
            return direction === "asc" ? dateA - dateB : dateB - dateA;
          },

          time: (aValue, bValue, direction) =>
            direction === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue),
        };

        const columnType: string =
          a.columnsFormat[columnIndex]?.dataType || "string";

        const sortHandler: SortHandler =
          sortHandlers[columnType] || sortHandlers.string;

        return sortHandler(aValue, bValue, sortConfig.direction);
      });
    }
    return tds;
  };
  const renderSortIcon = (columnIndex: number) => {
    if (sortConfig.sortColumnIndex === columnIndex) {
      return (
        <>
          {sortConfig.direction === "asc" ? (
            <Icon fontSize={"sm"} w={"16px"} color={themeConfig.primaryColor}>
              <IconCaretUpFilled />
            </Icon>
          ) : (
            <Icon fontSize={"sm"} w={"16px"} color={themeConfig.primaryColor}>
              <IconCaretDownFilled />
            </Icon>
          )}
        </>
      );
    }
    return (
      <Icon w={"14px"} opacity={0.3}>
        <IconCaretUpDownFilled stroke={1.5} />
      </Icon>
    );
  };
  const dataToMap =
    sortConfig.sortColumnIndex !== null &&
    sortConfig.sortColumnIndex !== undefined
      ? sortedData()
      : originalDataState;

  // Column filter
  useEffect(() => {
    const newOriginalDataState = columnsConfig
      ? tds.map((data) => {
          const filteredColumns = columnsConfig.map(
            (columnIndex) => data.columnsFormat[columnIndex]
          );
          return { ...data, columnsFormat: filteredColumns };
        })
      : [...tds];
    setOriginalDataState([...newOriginalDataState]); // Save real data when first render
  }, [tds, columnsConfig]);

  // Utils
  function handleRowClick(rowData: any) {
    if (rowClick) {
      rowClick(rowData);
    }
  }
  function handleSelectAllRows(isChecked: boolean) {
    setSelectAllRows(!selectAllRows);
    if (!isChecked) {
      const allIds = tds.map((row) => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  }
  function toggleRowSelection(rowId: number) {
    setSelectedRows((prevSelected) => {
      const isSelected = prevSelected.includes(rowId);

      if (isSelected) {
        setSelectAllRows(false);
        return prevSelected.filter((id) => id !== rowId);
      } else {
        if (tds.length === selectedRows.length + 1) {
          setSelectAllRows(true);
        }
        return [...prevSelected, rowId];
      }
    });
  }

  // SX
  const thHeight = "48px";
  const thWidth = "52.4px";
  const thBg = "body";
  const borderColor = "border.subtle";

  return (
    <CContainer
      borderColor={"border.muted"}
      minH={props?.minH || sh < 625 ? "400px" : ""}
    >
      {/* Table content */}
      <CContainer
        borderBottom={"1px solid"}
        borderColor={borderColor}
        minW={"full"}
        className="scrollX scrollY"
        overflow={"scroll"}
        // mb={"-6px"}
        // mr={"-6px"}

        flex={1}
        {...props}
      >
        <Table.Root
          ref={tableRef}
          w={tableHeader.length > 1 ? "full" : "fit-content"}
        >
          <Table.Header>
            <Table.Row
              position={"sticky"}
              top={0}
              zIndex={3}
              // borderTop={"1px solid"}
              borderColor={"gray.subtle"}
            >
              {batchOptions && (
                <Table.ColumnHeader
                  h={thHeight}
                  w={thWidth}
                  minW={"0% !important"}
                  // maxW={"50px !important"}
                  p={0}
                  position={"sticky"}
                  left={0}
                  zIndex={10}
                  borderBottom={"none !important"}
                >
                  <Center
                    h={thHeight}
                    // w={"50px"}
                    // borderRight={"1px solid"}
                    px={"10px"}
                    borderBottom={"1px solid"}
                    borderColor={borderColor}
                    bg={thBg}
                    // borderRadius={"6px 0 0 6px"}
                  >
                    <BatchOptions
                      selectedRows={selectedRows}
                      batchOptions={batchOptions}
                      selectAllRows={selectAllRows}
                      handleSelectAllRows={handleSelectAllRows}
                      tableRef={tableRef}
                    />
                  </Center>
                </Table.ColumnHeader>
              )}

              {tableHeader.map((tableColumnHeader, i) => (
                <Table.ColumnHeader
                  key={i}
                  whiteSpace={"nowrap"}
                  onClick={() => {
                    tableColumnHeader.sortable && sort(i);
                  }}
                  cursor={tableColumnHeader?.sortable ? "pointer" : "auto"}
                  borderBottom={"none !important"}
                  p={0}
                  {...tableColumnHeader?.tableColumnHeaderProps}
                >
                  <HStack
                    bg={thBg}
                    borderBottom={"1px solid"}
                    borderColor={borderColor}
                    px={4}
                    py={3}
                    h={thHeight}
                    pl={i === 0 ? 4 : ""}
                    pr={i === ths.length - 1 ? 4 : ""}
                    {...tableColumnHeader?.wrapperProps}
                  >
                    <Text>{tableColumnHeader?.th}</Text>

                    {tableColumnHeader?.sortable && renderSortIcon(i)}
                  </HStack>
                </Table.ColumnHeader>
              ))}

              {rowOptions && (
                <Table.ColumnHeader
                  position={"sticky"}
                  right={"0px"}
                  w={thWidth}
                  borderBottom={"none !important"}
                  p={0}
                >
                  <Center
                    h={thHeight}
                    px={4}
                    pr={"18px"}
                    py={3}
                    // borderLeft={"1px solid"}
                    borderBottom={"1px solid"}
                    borderColor={borderColor}
                    bg={thBg}
                    // borderRadius={"0 6px 6px 0"}
                  >
                    {/* Aksi */}
                  </Center>
                </Table.ColumnHeader>
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {dataToMap?.map((row, rowIndex) => {
              return (
                <Table.Row
                  key={rowIndex}
                  role="group"
                  onClick={() => {
                    handleRowClick(row);
                  }}
                  cursor={rowClick ? "pointer" : "auto"}
                  px={2}
                  position={"relative"}
                  bg={"body"}
                  {...trBodyProps}
                >
                  {batchOptions && (
                    <Table.Cell
                      minW={"0% !important"}
                      h={"48px"}
                      p={0}
                      position={"sticky"}
                      left={0}
                      bg={"body"}
                      zIndex={2}
                    >
                      <Center
                        className={rowClick && "td-content-group-hover"}
                        h={"48px"}
                        px={"10px"}
                        cursor={"pointer"}
                        borderBottom={
                          rowIndex !== dataToMap.length - 1 ? "1px solid" : ""
                        }
                        borderColor={borderColor}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowSelection(row.id);
                        }}
                      >
                        <Checkbox
                          colorPalette={themeConfig.colorPalette}
                          checked={selectedRows.includes(row.id)}
                          size={"sm"}
                          bg={"d1"}
                        />
                      </Center>
                    </Table.Cell>
                  )}

                  {row.columnsFormat.map((col, colIndex) => (
                    <Table.Cell
                      key={colIndex}
                      whiteSpace={"nowrap"}
                      p={0}
                      className={rowClick && "td-content-group-hover"}
                      {...col?.tableCellProps}
                    >
                      <HStack
                        py={3}
                        px={4}
                        h={"48px"}
                        borderBottom={
                          rowIndex !== dataToMap.length - 1 ? "1px solid" : ""
                        }
                        borderColor={borderColor}
                        {...col?.wrapperProps}
                      >
                        {typeof col?.td === "string" ||
                        typeof col?.td === "number" ? (
                          <Text>{col?.td}</Text>
                        ) : (
                          col?.td
                        )}
                      </HStack>
                    </Table.Cell>
                  ))}

                  {rowOptions && (
                    <Table.Cell
                      minW={"0% !important"}
                      h={"48px"}
                      p={0}
                      position={"sticky"}
                      right={"0px"}
                      bg={"body"}
                      zIndex={2}
                    >
                      <Center
                        h={"48px"}
                        className={rowClick && "td-content-group-hover"}
                        px={"10px"}
                        borderBottom={
                          rowIndex !== dataToMap.length - 1 ? "1px solid" : ""
                        }
                        borderColor={borderColor}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <RowOptions
                          rowData={row}
                          rowOptions={rowOptions}
                          tableRef={tableRef}
                        />
                      </Center>
                    </Table.Cell>
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </CContainer>

      {/* Table footer */}
      {((limitControl && setLimitControl) ||
        (pageControl && setPageControl) ||
        footerContent) && (
        <>
          {iss && (
            <CContainer gap={4} mt={4} px={4}>
              <HStack wrap={"wrap"}>
                <LimitControl
                  initialLimit={initialLimit}
                  limitControl={limitControl}
                  setLimitControl={setLimitControl}
                  limitOptions={limitOptions}
                  w={"fit"}
                  flex={"1 1 150px"}
                />

                <PageControl
                  initialPage={initialPage}
                  pageControl={pageControl}
                  setPageControl={setPageControl}
                  pagination={pagination}
                  w={"fit"}
                  flex={"1 1 150px"}
                />
              </HStack>

              <TableFooterNote footerContent={footerContent} />
            </CContainer>
          )}

          {!iss && (
            <SimpleGrid
              columns={3}
              gap={4}
              mt={4}
              px={4}
              {...footerContainerProps}
            >
              <LimitControl
                initialLimit={initialLimit}
                limitControl={limitControl}
                setLimitControl={setLimitControl}
                limitOptions={limitOptions}
                w={"fit"}
              />

              <TableFooterNote footerContent={footerContent} />

              <PageControl
                initialPage={initialPage}
                pageControl={pageControl}
                setPageControl={setPageControl}
                pagination={pagination}
                w={"fit"}
              />
            </SimpleGrid>
          )}
        </>
      )}
    </CContainer>
  );
};

export default TableComponent;
