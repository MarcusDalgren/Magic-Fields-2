<?php
global $mf_domain,$mf_pt_register,$mf_tax_register;
$groups = $this->get_groups();
?>
<h3><?php echo __(' Custom Groups',$mf_domain)?> <a href="admin.php?page=mf_dispatcher&mf_section=mf_custom_taxonomy&mf_action=add_custom_taxonomy" class="add-new-h2 button"><?php echo __( 'Add new Custom Group', $mf_domain )?></a></h3>
<?php if( empty( $custom_taxonomies ) ): ?>
  <div class="message-box info">
  <p>
    ooh, you do  haven't created any Custom Groups, try creating one <a href="<?php print bloginfo('url');?>/wp-admin/admin.php?page=mf_dispatcher&mf_section=mf_custom_group&mf_action=add_group">here</a>
  </p>
  </div>

<?php else: ?>
<table class="widefat fixed" cellspacing="0">
  <thead>
    <tr>
      <th scope="col" id="title" class="manage-column column-title" width="40%"><?php _e( 'Label ',$mf_domain); ?><small>(<?php _e('Menu name',$mf_domain); ?>)</small></th>
      <th scope="col" id="type_name" class="manage-column column-title" width="30%"><?php _e( 'Type',$mf_domain); ?></th>
      <th scope="col" id="type_desc" class="manage-column column-title" width="30%"><?php _e( 'Description',$mf_domain); ?></th>
    </tr> 
  </thead>
  <tfoot>
    <tr>
      <th scope="col" id="title" class="manage-column column-title" width="15%"><?php _e( 'Label ',$mf_domain); ?><small>(<?php _e('Menu name',$mf_domain); ?>)</small></th>
      <th scope="col" id="type_name" class="manage-column column-title" width="40%"><?php _e( 'Type',$mf_domain); ?></th>
      <th scope="col" id="type_desc" class="manage-column column-title" width="40%"><?php _e( 'Description',$mf_domain); ?></th>
    </tr>
  </tfoot>
  <tbody>
    <?php if($custom_taxonomies):?>
      <?php 
        $counter = 0;
         foreach($custom_taxonomies as $tax):
         $alternate = ($counter % 2 ) ? "alternate" : "";
         $counter++;
         //$tmp = unserialize($tax['arguments']);
      ?>
    <tr class="<?php print $alternate;?> iedit">
      <td>
        <strong><?php echo $tax->label; ?></strong> <small>( <?php echo $tax->labels->menu_name; ?> )</small>
        <div class="row-actions">
          <?php if (in_array($tax->name,$mf_tax_register)): ?>
          <span class="edit"> 
            <a href="admin.php?page=mf_dispatcher&mf_section=mf_custom_taxonomy&mf_action=edit_custom_taxonomy&taxonomy=<?php echo $tax->name; ?>">Edit Custom Taxonomy</a> |
          </span>
          <span class="delete">
            <?php 
              $link = "admin.php?page=mf_dispatcher&init=true&mf_section=mf_custom_taxonomy&mf_action=delete_custom_taxonomy&taxonomy={$tax->name}";
              $link = wp_nonce_url($link,"delete_custom_taxonomy_mf_custom_taxonomy");
            ?>
            <a href="<?php print($link);?>" class="mf_confirm" alt="<?php _e("This action can't be undone, are you sure?", $mf_domain );?>">Delete</a>
          </span>
          <?php endif; ?>
        </div>
      </td>
      <td> <?php echo $tax->name; ?></td>
      <td><?php echo $tax->description; ?></td>
    </tr>
      <?php endforeach; ?>
    <?php endif; ?>
  </tbody>
</table>
<?php endif; ?>