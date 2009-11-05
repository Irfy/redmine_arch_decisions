class FactorsController < ApplicationController
  unloadable

  helper :sort
  include SortHelper  

  def index
    sort_init 'id', 'asc'
    sort_update %w(id summary created_on)

    c = ARCondition.new()

    if params[:mode] == 'popup'
      @popup = true
      @arch_decision = ArchDecision.find(params[:arch_decision_id])
      factor_ids = @arch_decision.factors.collect{|factor| factor.id}
      c << ["NOT id IN (?)", factor_ids]
    end

    unless params[:summary].blank?
      summary = "%#{params[:summary].strip.downcase}%"
      c << ["LOWER(summary) LIKE ? OR id = ?", summary, params[:summary].to_i]
    end

    @factor_count = Factor.count(:conditions => c.conditions)
    @factor_pages = Paginator.new self, @factor_count,
                per_page_option,
                params['page']
    @factors = Factor.find :all, :order => sort_clause,
                        :conditions => c.conditions,
            :limit  =>  @factor_pages.items_per_page,
            :offset =>  @factor_pages.current.offset

    if params[:mode] == 'popup'
      render :layout => 'popup'  
    else
      render :action => "index", :layout => false if request.xhr?
    end
  end


  def show
    @factor = Factor.find(params[:id])
  end


  def new
    @factor = Factor.new(params[:factor])
    if request.get?
      # Do something?
    else
      if @factor.save
        flash[:notice] = l(:notice_successful_create)
        redirect_to( :action => 'show', :id => @factor )
        return
      end   
    end
  end


  def edit
    if request.post?
      @factor = Factor.find(params[:id])
      if @factor.update_attributes(params[:factor])
        flash[:notice] = l(:notice_successful_update)
        redirect_to :action => 'show', :id => @factor
      else
        show
        render :action => 'show'
      end
    else
      show
    end
  end


  def destroy
    @factor = Factor.find(params[:id])
    if @factor.destroy
      flash[:notice] = l(:notice_successful_delete)
    end
    redirect_to :action => 'index'
  end

end
