/**
 * FlexibleForm ControlsRenderer sample config.
 *
 * Assumptions and simplifications made for this POC:
 *
 * @type {*[]}
 */
export const formConfigSamples = [{
  id: 'form-match-profiles',
  name: 'matchProfilesForm',
  caption: 'ui-data-import.summary',
  template: 'simple',
  staticNamespace: '',
  editableNamespace: 'profile',
  dataAttributes: {},
  // Common Sections Block:
  commonSections: [{ // Incoming MARC Field section
    controlType: 'Section',
    staticControlType: 'Section',
    id: '**ns**-record-field',
    sectionKey: 'fieldMarc',
    name: '**ns**MatchExpression',
    label: 'ui-data-import.match.**ns**.record.field',
    optional: false,
    classNames: ['field', 'input-container'],
    dataAttributes: {},
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      component: 'TextField',
      id: 'criterion-**ns**.field.main',
      name: 'matchDetails[##ri##].**ns**MatchExpression.fields[0].value',
      label: 'ui-data-import.match.**ns**.MARC.field-main',
      validate: ['validateValueType', 'validateValueLength3'],
      dataAttributes: { 'data-test-field-main': '' },
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      component: 'TextField',
      id: 'criterion-**ns**.field.in1',
      name: 'matchDetails[##ri##].**ns**MatchExpression.fields[1].value',
      label: 'ui-data-import.match.**ns**.MARC.field-in1',
      validate: ['validateValueType', 'validateValueLength1'],
      dataAttributes: { 'data-test-field-in1': '' },
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      component: 'TextField',
      id: 'criterion-**ns**.field.in2',
      name: 'matchDetails[##ri##].**ns**MatchExpression.fields[2].value',
      label: 'ui-data-import.match.**ns**.MARC.field-in2',
      validate: ['validateValueType', 'validateValueLength1'],
      dataAttributes: { 'data-test-field-in2': '' },
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      component: 'TextField',
      id: 'criterion-**ns**.field.subfield',
      name: 'matchDetails[##ri##].**ns**MatchExpression.fields[3].value',
      label: 'ui-data-import.match.**ns**.MARC.field-subfield',
      validate: ['validateValueType', 'validateValueLength1'],
      dataAttributes: { 'data-test-field-subfield': '' },
    }],
  }, {
    controlType: 'Section',
    sectionKey: 'fieldInstance',
    staticControlType: 'Section',
    label: 'ui-data-import.match.**ns**.record.field',
    id: '**ns**-record-field',
    optional: false,
    classNames: ['field', 'input-container'],
    dataAttributes: {},
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      id: 'criterion-value-type',
      name: 'matchDetails[##ri##].**ns**MatchExpression.fields[0].value',
      label: '',
      component: 'Selection',
      placeholder: '',
      dataOptions: [],
      validate: null,
      dataAttributes: {},
    }],
  }, {
    controlType: 'Section',
    sectionKey: 'staticValueType',
    staticControlType: 'Section',
    label: '',
    id: '**ns**-static-value-type',
    optional: false,
    classNames: ['input-container', 'static-section'],
    dataAttributes: { 'data-test-static-value-section': '' },
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      id: 'criterion-static-value-type',
      name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.staticValueType',
      label: '',
      component: 'Select',
      dataOptions: [{
        value: 'TEXT',
        label: 'ui-data-import.match.**ns**.static.value-type.text',
      }, {
        value: 'NUMBER',
        label: 'ui-data-import.match.**ns**.static.value-type.number',
      }, {
        value: 'EXACT_DATE',
        label: 'ui-data-import.match.**ns**.static.value-type.date',
      }, {
        value: 'DATE_RANGE',
        label: 'ui-data-import.match.**ns**.static.value-type.date-range',
      }],
      placeholder: '',
      validate: null,
      dataAttributes: { 'data-test-select-static-value': '' },
    }, {
      controlType: 'CommonSection',
      id: 'section-incoming-static-value-text',
      stateField: 'staticValueType',
      sectionNamespace: 'incoming',
      acceptedSections: {
        TEXT: 'staticValueText',
        NUMBER: 'staticValueNumber',
        EXACT_DATE: 'staticValueExactDate',
        DATE_RANGE: 'staticValueDateRange',
      },
    }],
  }, {
    sectionKey: 'staticValueText',
    controlType: 'Field',
    staticControlType: 'KeyValue',
    id: 'criterion-static-value-text',
    name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.text',
    label: '',
    component: 'TextField',
    placeholder: '',
    validate: null,
    dataAttributes: { 'data-test-static-text-field': '' },
  }, {
    sectionKey: 'staticValueNumber',
    controlType: 'Field',
    staticControlType: 'KeyValue',
    id: 'criterion-static-value-number',
    name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.number',
    label: '',
    component: 'TextField',
    type: 'number',
    placeholder: '',
    validate: null,
    dataAttributes: { 'data-test-static-number-field': '' },
  }, {
    sectionKey: 'staticValueExactDate',
    controlType: 'Layout',
    staticControlType: 'Layout',
    label: '',
    id: '**ns**-static-value-exact-date',
    className: 'display-flex',
    dataAttributes: { 'data-test-static-exact-date-wrapper': '' },
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      dataType: 'date',
      id: 'criterion-static-value-exact-date',
      name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.exactDate',
      label: '',
      component: 'Datepicker',
      dateFormat: 'YYYY-MM-DD',
      placeholder: '',
      validate: null,
      dataAttributes: { 'data-test-static-exact-date-field': '' },
    }],
  }, {
    sectionKey: 'staticValueDateRange',
    controlType: 'Layout',
    staticControlType: 'Layout',
    label: '',
    id: '**ns**-static-value-date-range',
    className: 'display-flex',
    dataAttributes: { 'data-test-static-date-range-field': '' },
    childControls: [{
      controlType: 'Headline',
      staticControlType: 'Headline',
      weight: 'regular',
      margin: 'none',
      classNames: ['date-range-label'],
      childControls: [{
        controlType: 'FormattedMessage',
        staticControlType: 'FormattedMessage',
        id: 'ui-data-import.from',
      }],
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      dataType: 'date',
      id: 'criterion-static-value-from-date',
      name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.fromDate',
      component: 'Datepicker',
      dateFormat: 'YYYY-MM-DD',
      validate: null,
      dataAttributes: { 'data-test-static-from-date-field': '' },
    }, {
      controlType: 'Headline',
      staticControlType: 'Headline',
      weight: 'regular',
      margin: 'none',
      classNames: ['date-range-label'],
      childControls: [{
        controlType: 'FormattedMessage',
        staticControlType: 'FormattedMessage',
        id: 'ui-data-import.to',
      }],
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      dataType: 'date',
      id: 'criterion-static-value-to-date',
      name: 'matchDetails[##ri##].**ns**MatchExpression.staticValueDetails.toDate',
      component: 'Datepicker',
      dateFormat: 'YYYY-MM-DD',
      validate: null,
      dataAttributes: { 'data-test-static-to-date-field': '' },
    }],
  }, {
    controlType: 'Section',
    sectionKey: 'qualifier',
    staticControlType: 'Section',
    label: 'ui-data-import.match.**ns**.qualifier',
    name: '**ns**Qualifier',
    optional: true,
    enabled: false,
    classNames: ['qualifier', 'input-container'],
    dataAttributes: {},
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      id: 'criterion-**ns**.qualifier.term',
      name: 'matchDetails[##ri##].**ns**MatchExpression.qualifier.qualifierType',
      component: 'Select',
      placeholder: 'Select qualifier type',
      dataOptions: [{
        value: 'BEGINS_WITH',
        label: 'ui-data-import.match.qualifier.begins-with',
      }, {
        value: 'ENDS_WITH',
        label: 'ui-data-import.match.qualifier.ends-with',
      }, {
        value: 'CONTAINS',
        label: 'ui-data-import.match.qualifier.contains',
      }],
      validate: null,
      dataAttributes: {},
    }, {
      controlType: 'Field',
      staticControlType: 'KeyValue',
      id: 'criterion-**ns**.qualifier.value',
      name: 'matchDetails[##ri##].**ns**MatchExpression.qualifier.qualifierValue',
      component: 'TextField',
      placeholder: '',
      validate: null,
      dataAttributes: {},
    }],
  }, {
    controlType: 'Section',
    sectionKey: 'qualifierPart',
    staticControlType: 'Section',
    label: 'ui-data-import.match.**ns**.part',
    optional: true,
    enabled: false,
    classNames: ['part', 'input-container'],
    dataAttributes: {},
    childControls: [{
      controlType: 'Field',
      staticControlType: 'KeyValue',
      id: 'criterion-**ns**.qualifier.term',
      name: 'matchDetails[##ri##].**ns**MatchExpression.qualifier.comparisonPart',
      label: '',
      component: 'Select',
      placeholder: 'Select comparison type',
      dataOptions: [{
        value: 'NUMERICS_ONLY',
        label: 'ui-data-import.match.comparison-part.numerics-only',
      }, {
        value: 'ALPHANUMERICS_ONLY',
        label: 'ui-data-import.match.comparison-part.alpha-numerics-only',
      }],
      validate: null,
      dataAttributes: { 'data-test-compare-part': '' },
    }],
  }],
  childControls: [{
    controlType: 'Headline',
    staticControlType: 'Fragment',
    id: 'profile-headline',
    size: 'xx-large',
    tag: 'h2',
    dataAttributes: { 'data-test-header-title': true },
  }, {
    controlType: 'AccordionSet',
    staticControlType: 'AccordionSet',
    dataAttributes: {},
    childControls: [{
      controlType: 'Accordion',
      staticControlType: 'Fragment',
      id: 'summary',
      collapsed: false,
      separator: false,
      label: 'ui-data-import.summary',
      dataAttributes: {},
      childControls: [{
        controlType: 'Field',
        staticControlType: 'Fragment',
        component: 'TextField',
        name: 'name',
        label: 'ui-data-import.name',
        required: true,
        validate: ['validateRequiredField'],
        dataAttributes: { 'data-test-name-field': '' },
      }, {
        controlType: 'Field',
        staticControlType: 'Fragment',
        component: 'TextArea',
        name: 'description',
        label: 'ui-data-import.description',
        validate: null,
        dataAttributes: { 'data-test-description-field': '' },
      }],
    }, {
      controlType: 'Accordion',
      staticControlType: 'Accordion',
      id: 'match-profile-details',
      collapsed: false,
      separator: false,
      label: 'ui-data-import.details',
      dataAttributes: {},
      childControls: [{
        controlType: 'RecordTypesSelect',
        staticControlType: 'RecordTypesSelect',
        id: 'panel-existing',
        name: 'existingType',
        label: 'ui-data-import.record-type.existing',
        required: true,
        validate: null,
        dataAttributes: {},
      }, { // Match Criteria Set section
        controlType: 'Accordion',
        staticControlType: 'Accordion',
        id: 'match-criteria',
        collapsed: false,
        separator: null,
        label: 'ui-data-import.match.criteria',
        dataAttributes: {},
        childControls: [{
          controlType: 'Section',
          staticControlType: 'Section',
          optional: false,
          classNames: ['match-criteria'],
          repeatable: true,
          name: 'matchDetails',
          fields: 'matchDetails',
          emptyMessage: 'EMPTY FIELDS HERE',
          dataAttributes: {},
          childControls: [{ // Match Criterions List (array)
            controlType: 'Accordion',
            staticControlType: 'Accordion',
            label: 'ui-data-import.match.criterion',
            collapsed: false,
            separator: null,
            childControls: [{
              controlType: 'Section',
              staticControlType: 'Section',
              optional: false,
              classNames: ['match-criterion'],
              dataAttributes: {},
              childControls: [{ // Incoming Record Section
                controlType: 'Section',
                staticControlType: 'Section',
                label: 'ui-data-import.match.incoming.record',
                id: 'incoming-record-section',
                optional: false,
                classNames: ['incoming'],
                dataAttributes: {},
                childControls: [{
                  controlType: 'CommonSection',
                  id: 'section-incoming-field',
                  stateField: 'incomingRecord',
                  sectionNamespace: 'incoming',
                  acceptedSections: {
                    MARC_BIBLIOGRAPHIC: 'fieldMarc',
                    MARC_HOLDINGS: 'fieldMarc',
                    MARC_AUTHORITY: 'fieldMarc',
                    STATIC_VALUE: 'staticValueType',
                  },
                }, {
                  controlType: 'CommonSection',
                  id: 'section-incoming-qualifier',
                  stateField: 'incomingRecord',
                  sectionNamespace: 'incoming',
                  acceptedSections: {
                    MARC_BIBLIOGRAPHIC: 'qualifier',
                    MARC_HOLDINGS: 'qualifier',
                    MARC_AUTHORITY: 'qualifier',
                    EDIFACT_INVOICE: 'qualifier',
                    DELIMITED: 'qualifier',
                  },
                }, {
                  controlType: 'CommonSection',
                  id: 'section-incoming-qualifier-part',
                  stateField: 'incomingRecord',
                  sectionNamespace: 'incoming',
                  acceptedSections: {
                    MARC_BIBLIOGRAPHIC: 'qualifierPart',
                    MARC_HOLDINGS: 'qualifierPart',
                    MARC_AUTHORITY: 'qualifierPart',
                    EDIFACT_INVOICE: 'qualifierPart',
                    DELIMITED: 'qualifierPart',
                  },
                }],
              }, { // Match Criterion Section
                controlType: 'Section',
                staticControlType: 'Section',
                label: 'ui-data-import.match.criterion',
                name: 'matchCriterion',
                optional: false,
                classNames: ['criterion', 'input-container'],
                dataAttributes: {},
                childControls: [{
                  controlType: 'Field',
                  staticControlType: 'KeyValue',
                  component: 'Select',
                  id: 'criterion-criterion-type',
                  name: 'matchDetails[##ri##].matchCriterion',
                  label: '',
                  placeholder: '',
                  dataOptions: [{
                    value: 'EXACTLY_MATCHES',
                    label: 'ui-data-import.match.criterion-type.exactly-matches',
                  }, {
                    value: 'EXISTING_VALUE_CONTAINS_INCOMING_VALUE',
                    label: 'ui-data-import.match.criterion-type.existing-contains-incoming',
                  }, {
                    value: 'INCOMING_VALUE_CONTAINS_EXISTING_VALUE',
                    label: 'ui-data-import.match.criterion-type.incoming-contains-existing',
                  }, {
                    value: 'EXISTING_VALUE_BEGINS_WITH_INCOMING_VALUE',
                    label: 'ui-data-import.match.criterion-type.existing-begins-with-incoming',
                  }, {
                    value: 'INCOMING_VALUE_BEGINS_WITH_EXISTING_VALUE',
                    label: 'ui-data-import.match.criterion-type.incoming-begins-with-existing',
                  }, {
                    value: 'EXISTING_VALUE_ENDS_WITH_INCOMING_VALUE',
                    label: 'ui-data-import.match.criterion-type.existing-ends-with-incoming',
                  }, {
                    value: 'INCOMING_VALUE_ENDS_WITH_EXISTING_VALUE',
                    label: 'ui-data-import.match.criterion-type.incoming-ends-with-existing',
                  }],
                  validate: null,
                  dataAttributes: { 'data-test-match-criterion': '' },
                }],
              }, { // Existing Record Section
                controlType: 'Section',
                staticControlType: 'Section',
                label: 'ui-data-import.match.existing.record',
                id: 'existing-record-section',
                optional: false,
                classNames: ['existing'],
                dataAttributes: {},
                childControls: [{
                  controlType: 'CommonSection',
                  id: 'section-existing-field',
                  stateField: 'existingRecord',
                  sectionNamespace: 'existing',
                  acceptedSections: {
                    INSTANCE: 'fieldInstance',
                    HOLDINGS: 'fieldInstance',
                    ITEM: 'fieldInstance',
                    ORDER: 'fieldInstance',
                    INVOICE: 'fieldInstance',
                    MARC_BIBLIOGRAPHIC: 'fieldMarc',
                    MARC_HOLDINGS: 'fieldMarc',
                    MARC_AUTHORITY: 'fieldMarc',
                    STATIC_VALUE: 'fieldStatic',
                  },
                }, {
                  controlType: 'CommonSection',
                  id: 'section-existing-qualifier',
                  stateField: 'existingRecord',
                  sectionNamespace: 'existing',
                  acceptedSections: {
                    MARC_BIBLIOGRAPHIC: 'qualifier',
                    MARC_HOLDINGS: 'qualifier',
                    MARC_AUTHORITY: 'qualifier',
                    EDIFACT_INVOICE: 'qualifier',
                    DELIMITED: 'qualifier',
                  },
                }, {
                  controlType: 'CommonSection',
                  id: 'section-existing-qualifier-part',
                  stateField: 'existingRecord',
                  sectionNamespace: 'existing',
                  acceptedSections: {
                    MARC_BIBLIOGRAPHIC: 'qualifierPart',
                    MARC_HOLDINGS: 'qualifierPart',
                    MARC_AUTHORITY: 'qualifierPart',
                    EDIFACT_INVOICE: 'qualifierPart',
                    DELIMITED: 'qualifierPart',
                  },
                }],
              }],
            }],
          }],
        }],
      }],
    }],
  }, {
    controlType: 'ConfirmationModal',
    staticControlType: 'Fragment',
    id: 'confirm-edit-match-profile-modal',
    dataAttributes: {},
  }],
}];
