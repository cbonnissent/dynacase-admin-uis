<?php
/*
 * @author Anakeen
 * @license http://www.fsf.org/licensing/licenses/agpl-3.0.html GNU Affero General Public License
 * @package FDL
*/
/**
 * Generated Header (not documented yet)
 *
 * @author Anakeen
 * @version $Id: appl_access.php,v 1.7 2007/02/16 14:11:14 eric Exp $
 * @license http://www.fsf.org/licensing/licenses/agpl-3.0.html GNU Affero General Public License
 * @package FDL
 * @subpackage ACCESS
 */
/**
 */
// ---------------------------------------------------------------
// $Id: appl_access.php,v 1.7 2007/02/16 14:11:14 eric Exp $
// $Source: /home/cvsroot/anakeen/freedom/core/Action/Access/appl_access.php,v $
// ---------------------------------------------------------------
include_once ("FDL/editutil.php");
// -----------------------------------
function appl_access(Action & $action, $oid = 0)
{
    // -----------------------------------
    $action->lay->set("usefilter", false);
    $action->lay->set("URG", false);
    $packUrl = $action->parent->getJsLink("ACCESS:access.js", true, "APPL_ACCESS");
    $action->parent->getJsLink("ACCESS:appl_access.js", true, "APPL_ACCESS");
    $action->parent->getJsLink("ACCESS/Layout/edit.js", false, "APPL_ACCESS");
    $jslinks = array(
        array(
            "src" => $action->parent->getJsLink("lib/jquery/jquery.js")
        ) ,
        array(
            "src" => $action->parent->getJsLink("lib/jquery-ui/js/jquery-ui.js")
        ) ,
        array(
            "src" => $action->parent->getJsLink("lib/jquery-dataTables/js/jquery.dataTables.js")
        ) ,
        array(
            "src" => $packUrl
        )
    );
    $csslinks = array(
        array(
            "src" => $action->parent->getCssLink("lib/jquery-ui/css/smoothness/jquery-ui.css")
        ) ,
        array(
            "src" => $action->parent->getCssLink("lib/jquery-dataTables/css/jquery.dataTables.css")
        ) ,
        array(
            "src" => $action->parent->getCssLink("ACCESS/Layout/user_access.css")
        ) ,
        array(
            "src" => $action->parent->getCssLink("WHAT/Layout/size-normal.css")
        ) ,
        array(
            "src" => $action->parent->getCssLink("ACCESS/Layout/edit.css")
        )
    );
    $action->lay->setBlockData("CSS_LINKS", $csslinks);
    $action->lay->setBlockData("JS_LINKS", $jslinks);
    $action->lay->set("idAURG", "idapp");
    $action->lay->set("changeLabel", _("Select Application Access"));
    $action->lay->set("shortname", _("access:userlogin"));
    $action->lay->set("desc", _("username"));
    $action->lay->set("permission", _("permissions"));
    $action->lay->set("placeholder", _("Account filter"));
    $action->lay->set("accounttypelabel", _("accounttype"));
    
    $appl_info = array();
    simpleQuery($action->dbaccess, "select id,name,short_name from application where name='ACCESS'", $appl_info, false, true);
    $action->lay->set("valueAURG", trim(sprintf("%s (%s)", ($appl_info["name"]) , $appl_info["short_name"])));
    $action->lay->set("valueidAURG", $appl_info["id"]);
    
    $action->lay->set("imgaccounttype", $action->parent->getImageLink("access.gif", true, 18));
    $action->lay->set("valueaccounttype", "");
}
?>
