/**
 * FlexibleForm ControlsRenderer sample config.
 *
 * Assumptions and simplifications made for this POC:
 *
 */
export const formConfigSamples = [{
  id: 'form-match-profiles',
  name: 'matchProfilesForm',
  caption: 'ui-data-import.summary',
  template: 'simple',
  dataAttributes: {},
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
              childControls: [{ // Incoming MARC Record
                controlType: 'Section',
                staticControlType: 'Section',
                label: 'ui-data-import.match.incoming.MARC',
                optional: false,
                classNames: ['incoming'],
                dataAttributes: {},
                childControls: [{
                  controlType: 'Section',
                  staticControlType: 'Section',
                  name: 'incomingMatchExpression',
                  label: 'ui-data-import.match.incoming.MARC.field',
                  optional: false,
                  classNames: ['field', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    component: 'TextField',
                    id: 'criterion1-incoming.field.main',
                    name: 'matchDetails[0].incomingMatchExpression.fields[0].value',
                    label: 'ui-data-import.match.incoming.MARC.field-main',
                    validate: ['validateValueType', 'validateValueLength3'],
                    dataAttributes: { 'data-test-field-main': '' },
                  }, {
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    component: 'TextField',
                    id: 'criterion1-incoming.field.in1',
                    name: 'matchDetails[0].incomingMatchExpression.fields[1].value',
                    label: 'ui-data-import.match.incoming.MARC.field-in1',
                    validate: ['validateValueType', 'validateValueLength1'],
                    dataAttributes: { 'data-test-field-in1': '' },
                  }, {
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    component: 'TextField',
                    id: 'criterion1-incoming.field.in2',
                    name: 'matchDetails[0].incomingMatchExpression.fields[2].value',
                    label: 'ui-data-import.match.incoming.MARC.field-in2',
                    validate: ['validateValueType', 'validateValueLength1'],
                    dataAttributes: { 'data-test-field-in2': '' },
                  }, {
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    component: 'TextField',
                    id: 'criterion1-incoming.field.subfield',
                    name: 'matchDetails[0].incomingMatchExpression.fields[3].value',
                    label: 'ui-data-import.match.incoming.MARC.field-subfield',
                    validate: ['validateValueType', 'validateValueLength1'],
                    dataAttributes: { 'data-test-field-subfield': '' },
                  }],
                }, {
                  controlType: 'Section',
                  staticControlType: 'Section',
                  label: 'ui-data-import.match.incoming.qualifier',
                  name: 'incomingQualifier',
                  optional: true,
                  enabled: false,
                  classNames: ['qualifier', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    id: 'criterion1-incoming.qualifier.term',
                    name: 'matchDetails[0].incomingMatchExpression.qualifier.qualifierType',
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
                    id: 'criterion1-incoming.qualifier.value',
                    name: 'matchDetails[0].incomingMatchExpression.qualifier.qualifierValue',
                    component: 'TextField',
                    placeholder: '',
                    validate: null,
                    dataAttributes: {},
                  }],
                }, {
                  controlType: 'Section',
                  staticControlType: 'Section',
                  label: 'ui-data-import.match.incoming.part',
                  optional: true,
                  enabled: false,
                  classNames: ['part', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    id: 'criterion1-incoming.qualifier.term',
                    name: 'matchDetails[0].incomingMatchExpression.qualifier.comparisonPart',
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
              }, { // Match Criterion
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
                  id: 'criterion1-criterion-type',
                  name: 'matchDetails[0].matchCriterion',
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
              }, { // Existing Instance Record #1
                controlType: 'Section',
                staticControlType: 'Section',
                label: 'ui-data-import.match.existing.record',
                id: 'existing-record-section',
                optional: false,
                classNames: ['existing'],
                dataAttributes: {},
                childControls: [{
                  controlType: 'Section',
                  staticControlType: 'Section',
                  label: 'ui-data-import.match.existing.record.field',
                  id: 'existing-record-field',
                  optional: false,
                  classNames: ['field', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    id: 'criterion1-value-type',
                    name: '', // Will be defined in a feature story
                    label: '',
                    component: 'Select',
                    placeholder: '',
                    dataOptions: [], // Will be defined in a feature story
                    validate: null,
                    dataAttributes: {},
                  }],
                }, {
                  controlType: 'Section',
                  staticControlType: 'Section',
                  label: 'ui-data-import.match.existing.qualifier',
                  name: 'existingQualifier',
                  optional: true,
                  enabled: false,
                  classNames: ['qualifier', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    id: '',
                    name: 'matchDetails[0].existingMatchExpression.qualifier.qualifierType',
                    label: '',
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
                    id: '',
                    name: 'matchDetails[0].existingMatchExpression.qualifier.qualifierValue',
                    label: '',
                    component: 'TextField',
                    validate: null,
                    dataAttributes: {},
                  }],
                }, {
                  controlType: 'Section',
                  staticControlType: 'Section',
                  label: 'ui-data-import.match.existing.part',
                  name: 'existingPartOfTheValue',
                  optional: true,
                  enabled: false,
                  classNames: ['part', 'input-container'],
                  dataAttributes: {},
                  childControls: [{
                    controlType: 'Field',
                    staticControlType: 'KeyValue',
                    id: '',
                    name: 'matchDetails[0].existingMatchExpression.qualifier.comparisonPart',
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
                    dataAttributes: {},
                  }],
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
