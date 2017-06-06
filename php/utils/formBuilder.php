<?php
function buildFormHead($action, $method){
    return '<form class="borderlessForm" action="'.$action.'" method="'.$method.'">';
}

function buildRow($label, $formId, $value, $required){
    $row = '<div class="formLabelTable"> '.$label.': </div>';
    $row .= '<input class="formInputTable" type="text" name="'.$formId.'" value="'.$value.'" ';
    if($required) $row .= "required";
    $row .= '>';
    return $row;
}

function buildPWRow($label, $formId, $value){
    $row = '<div class="formLabelTable"> '.$label.': </div>';
    $row .= '<input class="formInputTable" type="password" placeholder="'.$value.'" name="'.$formId.'"required>';
    return $row;
}

function buildSubmitButton($name, $label){
    return '<button type="submit" name="'.$name.'">'.$label.'</button>';
}

function buildEndTag(){
    return '</form>';
}

function buildH3Form($title){
    return '<h3 class="formHeading3">'.$title.'</h3>';
}



