﻿module.exports.HSMCommands = {
  echo: {
    mtid: "notification",
    Code: "B2",
    Pattern: 'msgsize:4/string-left-zero, mac_message:msgsize/string-left-zero'
  },
    
  echo_resp: {
    Code: "B3",
    mtid: "discard",
    Pattern: 'errorcode:2/string, mac_message:4/string'
  },
    
  generate_key: {
    Code: "A0",
    mtid: "request",
    Pattern: 'mode:1/string, key_type:3/string, key_scheme:1/string'
  },
    
  generate_key_tmk: { // ? ne haresva vhod. key
    Code: "A0",
    mtid: "request",
    Pattern: 'mode:1/string, key_type:3/string, key_scheme:1/string, ";", zmk_tmk_flag:1/string, tmk:33/string, key_scheme1:1/string'
  },

  generate_key_resp: {
    Code: "A1",
    mtid: "response",
    Pattern: "errorcode:2/string, keyA32:33/string, key_check_value:6/string"
  },

  generate_tpk: {
    Code: "HC",
    mtid: "request",
    Pattern: 'tmk:33/string, ";", key_scheme:1/string, key_scheme1:1/string, "0"'
  },

  generate_tpk_resp: {
    Code: "HD",
    mtid: "response",
    Pattern: "errorcode:2/string, tpk:33/string, keyA32:32/string"
  },

  generate_tak: {
    Code: "HA",
    mtid: "request",
    Pattern: 'tmk:33/string, ";", key_scheme:1/string, key_scheme1:1/string, "0"'
  },
  
  generate_tak_resp: {
    Code: "HB",
    mtid: "response",
    Pattern: "errorcode:2/string, tpk:33/string, keyA32:32/string"
  },

  generate_mac: { // ? razli4en razmer pri razli4ni vhod. danni / kakva e daljinata na mac_message i za6to samo 8 raboti
    Code: "M6",
    mtid: "request",
    Pattern: 'mac_mode:1/string, mac_input_format:1/string, mac_algorithm:2/string, mac_padding_method:1/string, mac_key_type:3/string, mac_key:33/string, msgsize:4/string-left-zero, mac_message:msgsize/string'
  },
  
  generate_mac_resp: { // ? pri gre6ka mac poleto go nqma / vrashta daljina 12 a ne 8 po dokum.
    Code: "M7",
    mtid: "response",
    Pattern: "errorcode:2/string, mac:12/string"
  },

  verify_mac: {
    Code: "M8",
    mtid: "request",
    Pattern: 'mac_mode:1/string, mac_input_format:1/string, mac_algorithm:2/string, mac_padding_method:1/string, mac_key_type:3/string, mac_key:33/string, msgsize:4/string-left-zero, mac_message:msgsize/string, mac:8/string'
  },

  verify_mac_resp: {
    Code: "M9",
    mtid: "response",
    Pattern: "errorcode:2/string"
  },

  form_key: {
    Code: "A4",
    mtid: "request",
    Pattern: 'number_of_components:1/string, key_type:3/string, key_scheme:1/string, key_component1:33/string, key_component2:33/string'
  },
  
  form_key_resp: {
    Code: "A5",
    mtid: "response",
    Pattern: "errorcode:2/string, keyA32:33/string, key_check_value:6/string"
  },

  generate_keycheckvalue: { //?  Key Scheme,X
    Code: "BU",
    mtid: "request",
    Pattern: 'key_type_code:2/string, key_length_flag:1/string, keyA32:33/string'
  },
  
  generate_keycheckvalue_resp: {
    Code: "BV",
    mtid: "response",
    Pattern: "errorcode:2/string, key_check_value16:16/string"
  },

  derive_pin_ibm: { //?  Key Scheme,X  offset: '0000FFFFFFFF'
    Code: "EE",
    mtid: "request",
    Pattern: 'pvk:33/string, offset:12/string, check_length:2/string-left-zero, account:12/string, decimalisation_table:16/string, pin_validation_data:12/string'
  },

  derive_pin_ibm_resp: {
    Code: "EF",
    mtid: "response",
    Pattern: "errorcode:2/string, pin:5/string" 
  },

  generate_pin: {
    Code: "JA",
    mtid: "request",
    Pattern: 'account:12/string, check_length:2/string-left-zero'
  },
  
  generate_pin_resp: {
    Code: "JB",
    mtid: "response",
    Pattern: "errorcode:2/string, pin:5/string"
  },

  generate_offset_ibm: { //? No implementor for BK.
    Code: "BK",
    mtid: "request",
    Pattern: 'key_type:3/string, keyA32:33/string, pvk:33/string, pin_block:16/string, pin_block_format:2/string, check_length:2/string-left-zero, account:12/string, decimalisation_table:16/string, pin_validation_data:12/string'
  },
  
  generate_offset_ibm_resp: {
    Code: "BL",
    mtid: "response",
    Pattern: "errorcode:2/string, offset:12/string"
  },

  verify_term_pin_ibm: {
    Code: "DA",
    mtid: "request",
    Pattern: 'tpk:33/string, pvk:33/string, maximum_pin_length:2/string-left-zero, pin_block:16/string, pin_block_format:2/string, check_length:2/string-left-zero, account:12/string, decimalisation_table:16/string, pin_validation_data:12/string, offset:12/string'
  },
  
  verify_term_pin_ibm_resp: {
    Code: "DB",
    mtid: "response",
    Pattern: "errorcode:2/string"
  },

  import_key: {
    Code: "A6",
    mtid: "request",
    Pattern: 'key_type:3/string, zmk:33/string, keyA32:33/string, key_scheme:1/string'
  },
  
  import_key_resp: {
    Code: "A7",
    mtid: "response",
    Pattern: "errorcode:2/string, keyA32:33/string, key_check_value:6/string"
  },

  translate_tpk_zpk: {
    Code: "CA",
    mtid: "request",
    Pattern: 'source_tpk:33/string, destination_zpk:33/string, "12", source_pin_block:16/string, source_pin_block_format:2/string, destination_pin_block_format:2/string, account:12/string'
  },
  
  translate_tpk_zpk_resp: {
    Code: "CB",
    mtid: "response",
    Pattern: "errorcode:2/string, check_length:2/string, destination_pin_block:16/string, pin_block_format:2/string"
  },

  print_pin: { // ? print_fields razmer?
    Code: "PE",
    mtid: "request",
    Pattern: 'document_type:1/string, account:12/string, pin:16/string, print_fields:1/string'
  },
  
  print_pin_start: {
    Code: "PF",
    mtid: "notification",
    Pattern: "errorcode:2/string"
  },
  
  print_pin_resp: {
    Code: "PZ",
    mtid: "response",
    Pattern: "errorcode:2/string"
  },

  print_format: {// ? print_fields razmer?
    Code: "PA",
    mtid: "request",
    Pattern: 'print_fields:1/string'
  },
  
  print_format_resp: {
    Code: "PB",
    mtid: "response",
    Pattern: "errorcode:2/string"
  },

  translate_tpk_lmk: {
    Code: "JC",
    mtid: "request",
    Pattern: 'source_tpk:33/string, source_pin_block:16/string, source_pin_block_format:2/string, account:12/string'
  },
  
  translate_tpk_lmk_resp: {
    Code: "JD",
    mtid: "response",
    Pattern: "errorcode:2/string, pin:5/string"
  },

  translate_zpk_lmk: {
    Code: "JE",
    mtid: "request",
    Pattern: 'source_zpk:33/string, source_pin_block:16/string, source_pin_block_format:2/string, account:12/string'
  },
  
  translate_zpk_lmk_resp: {
    Code: "JF",
    mtid: "response",
    Pattern: "errorcode:2/string, pin:5/string"
  },

  generate_offset_ibm_lmk: {
    Code: "DE",
    mtid: "request",
    Pattern: 'pvk:pvk/string, pin:5/string, check_length:2/string-left-zero, account:12/string, decimalisation_table:16/string, pin_validation_data:12/string'
  },
  
  generate_offset_ibm_lmk_resp: {
    Code: "DF",
    mtid: "response",
    Pattern: "errorcode:2/string, offset:12/string"
  }

}
